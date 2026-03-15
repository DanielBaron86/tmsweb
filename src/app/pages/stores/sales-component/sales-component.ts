import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { AuthServices } from '../../../services/auth/auth.services';
import { SessionService } from '../../../services/stores/session-service';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import {
  GoodsStatusEnum,
  StoreOperationType,
  TaskTypesStatus,
  UserTypeEnum,
} from '../../../models/status-enums';
import {
  SelectedOption,
  SelectWithSearch,
} from '../../../components/form/select-with-search/select-with-search';
import { ClientService } from '../../../services/clients/client-service';
import { QueryBuilder } from '../../../components/shared/query-builder/query-builder';
import { QueryFilters } from '../../../models/query-models';
import { GoodsInstanceSearch } from '../../../components/shared/goods-instance-search/goods-instance-search';
import { v_GoodsTypesInstances } from '../../../models/goods-models';
import { CartItem } from '../../../models/stores-models';

@Component({
  selector: 'app-sales-component',
  imports: [DatePipe, EnumToStringPipe, SelectWithSearch, QueryBuilder, GoodsInstanceSearch],
  templateUrl: './sales-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
  constructor() {
    effect(() => {
      // const ses = this.activeSession.value();
      // console.log(ses);
    });
  }

  readonly authService = inject(AuthServices);
  readonly sessionService = inject(SessionService);
  readonly clientService = inject(ClientService);

  userProfile = this.authService.userProfile();
  activeSession = this.sessionService.getActiveSession(() => this.userProfile.id);
  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;
  selectOptions = computed<SelectedOption[]>(() => {
    const options: SelectedOption[] = [];
    const clients = this.clientService.flatCache();
    clients.forEach((option) =>
      options.push({ value: option.id.toString(), text: `${option.firstName} ${option.lastName}` }),
    );
    return options;
  });
  availableOptions: SelectedOption[] = [
    { value: 'id', text: 'Id' },
    { value: 'email', text: 'Email' },
    { value: 'firstName', text: 'First Name' },
    { value: 'lastName', text: 'Last Name' },
    { value: 'username', text: 'Username' },
  ];

  itemsOptions: SelectedOption[] = [
    { value: 'Id', text: 'Id' },
    { value: 'GoodModelId', text: 'Good Model Id' },
    { value: 'Price', text: 'Price' },
    { value: 'SerialNumber', text: 'Serial Number' },
  ];

  defaultItemFilter = linkedSignal({
    source: () => this.activeSession.value(),
    computation: () => {
      if (this.activeSession.hasValue() && this.activeSession.value() !== null) {
        return {
          pageNumber: 1,
          pageSize: 10,
          queryFields: [
            {
              method: 'where',
              keyField: 'LocationId',
              keyValue: this.activeSession
                .value()
                ?.cashRegisterEntity?.locationTypesInstances.id.toString(),
            },
            {
              method: 'where',
              keyField: 'status',
              keyValue: GoodsStatusEnum.AVAILABLE,
            },
          ],
        } as QueryFilters;
      }
      return null;
    },
  });

  protected ReceiveClient($event: any) {
    // this.defaultItemFilter.update((value) => {
    //   const locationId = value!.queryFields?.find((f) => f.keyField === 'LocationId');
    //   console.log(locationId);
    //   return {
    //     ...$event,
    //     queryFields: [
    //       ...(locationId ? [locationId] : []),
    //       ...($event.queryFields?.filter((f) => f.keyField !== 'LocationId') ?? []),
    //     ],
    //   };
    // });
  }

  protected ReceiveItem($event: v_GoodsTypesInstances) {}

  protected ReceiveClientFilters($event: QueryFilters) {
    console.log('ReceiveClientFilters', $event);
    this.clientService.search($event);
  }
  cartItems = signal<CartItem[]>([]);
  protected ReceiveItemFilters($event: v_GoodsTypesInstances) {
    const item: CartItem = { operationType: 1, goodId: $event.id, price: $event.price, notes: [] };
    this.cartItems.update((items) => [...items, item]);
  }

  protected readonly StoreOperationType = StoreOperationType;
}
