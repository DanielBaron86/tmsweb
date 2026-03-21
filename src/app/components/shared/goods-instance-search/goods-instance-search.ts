import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import DataService from '../../../services/data-service';
import { PaginationComponent } from '../pagination-component/pagination-component';
import { v_GoodsTypesInstances } from '../../../models/goods-models';
import GoodsInstancesService from '../../../services/goods/goods-instances-service';
import { QueryBuilder } from '../query-builder/query-builder';
import { QueryFilters } from '../../../models/query-models';
import { SelectedOption } from '../../form/select-with-search/select-with-search';

@Component({
  selector: 'app-goods-instance-search',
  imports: [PaginationComponent, QueryBuilder],
  providers: [{ provide: DataService, useExisting: GoodsInstancesService }],
  templateUrl: './goods-instance-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsInstanceSearch implements OnInit {
  constructor() {
    effect(() => {
      const menuEl = this.dropdownMenu()?.nativeElement;
      if (menuEl) {
        menuEl.style.display = this.isOpen() ? 'block' : 'none';
      }
    });
  }
  ngOnInit(): void {
    if (this.defaultFilters() != null) {
      this.dataService.search(this.defaultFilters()!);
    }
  }
  dropdownMenu = viewChild<ElementRef<HTMLElement>>('dropdownMenu');
  dataService = inject(DataService) as GoodsInstancesService;
  defaultFilters = input<null | QueryFilters>(null);
  defaultOptions = input<SelectedOption[] | null>(null);
  headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );
  isOpen = signal(false);
  toggleText = computed(() => (this.isOpen() ? 'Close' : 'Open'));
  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }
  selectItem = output<v_GoodsTypesInstances>();
  protected EmitItem(item: v_GoodsTypesInstances) {
    if (!item) {
      return;
    }
    this.selectItem.emit(item);
  }
  availableOptions = computed(() => {
    const availableOptions: SelectedOption[] = [
      { value: 'Id', text: 'Id' },
      { value: 'GoodModelId', text: 'Good Model Id' },
      { value: 'Price', text: 'Price' },
      { value: 'LocationId', text: 'Location Id' },
      { value: 'SerialNumber', text: 'Serial Number' },
      { value: 'status', text: 'Status' },
    ];
    return this.defaultOptions() ?? availableOptions;
  });

  protected ReceiveFilters($event: QueryFilters) {
    const existing = this.defaultFilters();
    if (this.defaultFilters() != null) {
      $event.queryFields = [...($event.queryFields ?? []), ...(existing!.queryFields ?? [])];
    }
    this.dataService.search($event);
  }
}
