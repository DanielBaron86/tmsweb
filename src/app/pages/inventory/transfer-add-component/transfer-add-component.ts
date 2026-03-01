import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { AuthServices } from '../../../services/auth/auth.services';
import {
  SelectedOption,
  SelectWithSearch,
} from '../../../components/form/select-with-search/select-with-search';
import { LocationService } from '../../../services/location/location-service';
import { QueryFilters } from '../../../models/query-models';
import { QueryBuilder } from '../../../components/shared/query-builder/query-builder';
import { GoodsInstanceSearch } from '../../../components/shared/goods-instance-search/goods-instance-search';
import { PaginationHeader } from '../../../models/base-model';
import { LocationUnitModel } from '../../../models/location-models';
import { v_GoodsTypesInstances } from '../../../models/goods-models';
import { TransferTask } from '../../../models/tasks-models';
import { TaskServices } from '../../../services/tasks/task-services';

@Component({
  selector: 'app-transfer-add-component',
  imports: [SelectWithSearch, QueryBuilder, GoodsInstanceSearch],
  templateUrl: './transfer-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferAddComponent {
  readonly auth = inject(AuthServices);
  readonly locationService = inject(LocationService);
  readonly userProfile = this.auth.userProfile();
  readonly taskService = inject(TaskServices);

  queryFilters = signal<QueryFilters>({
    pageNumber: 1,
    pageSize: 100,
    queryFields: [],
  });
  locationOptions = this.locationService.locationsTypesResource;
  header = computed<PaginationHeader>(() =>
    this.locationOptions.hasValue()
      ? JSON.parse(this.locationOptions.headers()?.get('X-Pagination') ?? '{}')
      : {},
  );

  displayItems = linkedSignal({
    source: () => this.locationOptions.value(),
    computation: () => {
      const pagedData = this.locationOptions.value() as LocationUnitModel[];
      if (pagedData) {
        return pagedData;
      }
      return this.locationOptions.value() ?? [];
    },
  });

  options = computed<SelectedOption[]>(() => {
    const options: SelectedOption[] = [];
    this.displayItems().forEach((item) => {
      options.push({ value: item.id.toString(), text: item.description });
    });
    return options;
  });

  locationOption = signal<SelectedOption>({ value: '0', text: '' });

  availableOptions: SelectedOption[] = [
    { value: 'Address', text: 'Address' },
    { value: 'Description', text: 'Description' },
    { value: 'locationTypeId', text: 'Location Type' },
  ];

  protected ReceiveFilters($event: any) {
    this.queryFilters.update((val) => $event);
  }
  transferTask = signal<TransferTask>({
    creatorId: this.userProfile?.id,
    userName: this.userProfile?.username,
    description: '',
    goodsTransfer: {
      goodId: [],
      toLocation: 0,
    },
  });

  /**
   * TO DO - change selectedItems to avoid duplicate obejcts info
   */
  selectedItems = signal<v_GoodsTypesInstances[]>([]);
  existing = new Set<number>();
  protected ReceiveItem(receivedItem: v_GoodsTypesInstances) {
    if (this.existing.has(receivedItem.id)) return;
    this.existing.add(receivedItem.id);
    this.selectedItems.update((items) => [...items, receivedItem]);
    this.transferTask.update((task) => ({
      ...task, /// clone the object with spread operator , creatorId, userName , description
      goodsTransfer: {
        ///clone the object with spread operator ,toLocation
        ...task.goodsTransfer,
        goodId: [...task.goodsTransfer.goodId, receivedItem.id], /// avoid push, use spread to add
      },
    }));
  }

  protected ReceiveLocation($event: any) {
    this.locationOption.update((val) => $event);
    this.transferTask.update((task) => ({
      ...task,
      goodsTransfer: { ...task.goodsTransfer, toLocation: $event.value },
    }));
    console.log(this.transferTask());
  }

  protected RemoveItem(id: number) {
    this.selectedItems.update((items) => items.filter((item) => item.id !== id));
    this.existing.delete(id);
  }

  protected SetDescription(value: string) {
    this.transferTask.update((task) => ({ ...task, description: value }));
  }

  protected SaveTask() {
    this.taskService.createTransferTask(this.transferTask()).subscribe((data) => {
      console.log('saved', data);
    });
  }
}
