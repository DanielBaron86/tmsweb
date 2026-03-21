import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
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
import { CartItem, CreateCart } from '../../../models/stores-models';
import { form } from '@angular/forms/signals';
import { CartsServices } from '../../../services/stores/carts-services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface CartState {
  items: CartItem[];
}

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
  readonly cartsServices = inject(CartsServices);
  readonly destroyRef = inject(DestroyRef);
  readonly router = inject(Router);
  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;
  protected readonly StoreOperationType = StoreOperationType;
  selectedCartId = this.cartsServices.selectCartId;
  userProfile = this.authService.userProfile();
  activeSession = this.sessionService.getActiveSession(() => this.userProfile.id);
  selectOptions = computed<SelectedOption[]>(() => {
    const options: SelectedOption[] = [];
    const clients = this.clientService.flatCache();
    clients.forEach((option) =>
      options.push({ value: option.id.toString(), text: `${option.firstName} ${option.lastName}` }),
    );
    return options;
  });
  createCart = computed<CreateCart>(() => {
    const clerkId = this.activeSession.value()?.assignedClerk;
    const clientId = this.clientService.selectClient()?.id;
    const storeLocation = this.activeSession.value()?.cashRegisterEntity?.locationId;
    return {
      clerkId: clerkId,
      clientId: clientId,
      storeLocation: storeLocation,
    } as unknown as CreateCart;
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
          pageSize: 20,
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
    this.clientService.selectClientId.set($event.value);
  }

  protected ReceiveClientFilters($event: QueryFilters) {
    console.log('ReceiveClientFilters', $event);
    this.clientService.search($event);
  }
  cartItems = signal<CartItem[]>([]);
  cartForm = form(this.cartItems);

  protected ReceiveItemFilters($event: v_GoodsTypesInstances) {
    const item: CartItem = { operationType: 1, goodId: $event.id, price: $event.price, notes: [] };
    this.addItem(item);
  }
  state = linkedSignal({
    source: () => this.cartsServices.selectedCart(),
    computation: (cart) => {
      const items: CartItem[] = [];
      if (cart) {
        cart.storeCartsEntityDetails.forEach((item) => {
          return items.push({
            operationType: item.operationType,
            goodId: item.goodId,
            price: item.price,
            notes: item.notes ?? [],
          });
        });
      }
      return { items: items } as CartState;
    },
  });

  addItem(item: CartItem) {
    const exists = this.state().items.some((i) => i.goodId === item.goodId);
    if (exists) {
      return;
    }

    const $cartid = this.cartsServices.selectCartId()
      ? of(this.cartsServices.selectCartId())
      : this.cartsServices.CreateCart(this.createCart()).pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((res) => this.cartsServices.selectCartId.set(res.id)),
          map((res) => res.id),
        );
    $cartid
      .pipe(
        filter((cartId): cartId is number => cartId !== null),
        switchMap((cartId) => this.cartsServices.AddToCart(cartId, item)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (data) => {
          console.log('added to cart', data);
          this.state.update((s) => {
            return { ...s, items: [...s.items, item] };
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  removeItem(goodId: number) {
    this.cartsServices.RemoteItemFromCart(goodId);
    this.state.update((s) => ({
      ...s,
      items: s.items.filter((i) => i.goodId !== goodId),
    }));
  }

  updatePrice(goodId: number, price: number) {
    this.state.update((s) => ({
      ...s,
      items: s.items.map((i) => (i.goodId === goodId ? { ...i, price } : i)),
    }));
  }

  addNote(goodId: number, note: string) {
    this.state.update((s) => ({
      ...s,
      items: s.items.map((i) => (i.goodId === goodId ? { ...i, notes: [...i.notes, note] } : i)),
    }));
  }

  clear() {
    this.state.set({ items: [] });
  }

  protected ToPayment(selectedCartId: number | null) {
    this.router.navigate([`/carts/${selectedCartId}/view`]);
  }
}
