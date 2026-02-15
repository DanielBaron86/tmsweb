import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  output,
  signal,
  viewChild
} from '@angular/core';
import DataService from '../../../services/data-service';
import {PaginationComponent} from '../pagination-component/pagination-component';
import { v_GoodsTypesInstances} from '../../../models/goods-models';
import GoodsInstancesService from '../../../services/goods/goods-instances-service';
import {QueryBuilder} from '../query-builder/query-builder';
import {QueryFilters} from '../../../models/query-models';
import {SelectedOption} from '../../form/select-with-search/select-with-search';

@Component({
  selector: 'app-goods-instance-search',
  imports: [
    PaginationComponent,
    QueryBuilder
  ],
  providers: [
    {provide: DataService, useExisting: GoodsInstancesService}
  ],
  templateUrl: './goods-instance-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsInstanceSearch {
  constructor() {
    effect(() => {
      const menuEl = this.dropdownMenu()?.nativeElement;
      if (menuEl) {
        menuEl.style.display = this.isOpen() ? 'block' : 'none';
      }
    });
  }
  dropdownMenu = viewChild<ElementRef<HTMLElement>>("dropdownMenu");
  dataService = inject(DataService) as GoodsInstancesService
  headerInfo =this.dataService.header
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1)
  );
  isOpen = signal(false)
  toggleText = computed(() => this.isOpen() ? 'Close' : 'Open');
  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }
  queryFilter: QueryFilters={
    pageNumber: 1,
    pageSize: 100,
    queryFields: [
      {
        keyField: "Status",
        keyValue: "1",
        method: "where"
      }
    ]
  }
  getItems = this.dataService.getGoodsWithFilters(this.queryFilter)
  itemsOptions = computed<v_GoodsTypesInstances[]>( ()=> {
    const options: v_GoodsTypesInstances[] = [];
    this.getItems.displayItems().forEach((item) => {
      options.push(item)
    })
    return options
  })

  selectItem = output<v_GoodsTypesInstances>();
  protected EmitItem(item: any) {
    console.log(item)
    if (!item) {return;}
    this.selectItem.emit( item );
  }
  availableOptions :SelectedOption[] =[
    {value: 'Id', text: 'Id'},
    {value: 'GoodModelId', text: 'Good Model Id'},
    {value: 'Price', text: 'Price'},
    {value: 'LocationId', text: 'Location Id'},
    {value: 'SerialNumber', text: 'Serial Number'},
  ]
  protected ReceiveFilters($event: QueryFilters) {
    this.dataService.queryFilters.set($event);

  }
}
