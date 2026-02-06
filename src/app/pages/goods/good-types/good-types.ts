import {
  ChangeDetectionStrategy,
  Component, computed, effect,
  ElementRef,
  inject,
  linkedSignal, signal,
  viewChildren, WritableSignal
} from '@angular/core';
import GoodsTypesService from '../../../services/goods/./goods-types-service';
import {ButtonComponent} from "../../../components/ui/button-component/button-component";
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {DatePipe, LocationStrategy} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {InventoryKey} from '../../../models/status-enums';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';
import DataService from '../../../services/data-service';
import BaseItemsService from '../../../services/goods/base-items-service';
import {BaseCollectionName, paginatedResult, TypesCollectionName} from '../../../models/base-model';

@Component({
  selector: 'app-good-types',
  imports: [
    ButtonComponent,
    SpinnerComponent,
    DatePipe,
    EnumToStringPipe,
    PaginationComponent
  ],
  providers: [
    {provide: DataService, useClass: GoodsTypesService}
  ],
  templateUrl: './good-types.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypes {
  location = inject(LocationStrategy);
  constructor() {
    effect( () =>{
      this.location.replaceState(null, '','main/base_types/',`pageNumber=${this.dataService.activePage()}&pageSize=${this.goodTypesList().paginationHeader.PageSize}`);
    } )
  }


  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('goodTypeList');

  dataService = inject(DataService);
  goodTypesList: WritableSignal<paginatedResult<TypesCollectionName[]>> = this.dataService.getCollectionList()
  activePage = signal<number>(1);
  pageNumbers = computed(() =>
    Array.from({ length: this.goodTypesList().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );


  protected onSearchInput($event: any) {
  this.filterTableByString($event.target.value);
  }
  protected filterTableByString(filterValue: string) {
    this.goodTypesList().result[this.dataService.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.description.toLowerCase().includes(filterValue.toLowerCase()) || val.goodModelBaseTypeEntity?.manufacturer.toLowerCase().includes(filterValue.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected filterTableById(filterValue: number) {
    this.goodTypesList().result[this.dataService.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.id == filterValue
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected readonly InventoryKey = InventoryKey;

  protected decreasePage() {
    this.dataService.activePage() < 2 ? this.activePage.set(this.goodTypesList().paginationHeader.TotalPageCount) : this.activePage.set(this.dataService.activePage() - 1);
    console.log(this.dataService.activePage() );
    if (!this.dataService.cachedPages().includes(this.dataService.activePage())) {
      this.dataService.pageNumber.set(this.dataService.activePage());
      this.dataService.cachedPages().push(this.dataService.activePage()) ;
    }

  }

  protected increasePage() {

    this.dataService.activePage() > this.goodTypesList().paginationHeader.TotalPageCount-1 ? this.activePage.set(1) : this.activePage.set(this.dataService.activePage() + 1);
    console.log(this.dataService.activePage() );
    if (!this.dataService.cachedPages().includes(this.dataService.activePage())) {
      this.dataService.pageNumber.set(this.dataService.activePage());
      this.dataService.cachedPages().push(this.dataService.activePage()) ;
    }
  }

  protected changePage(pageNumber: number) {
    this.activePage.set(pageNumber);
    if (!this.dataService.cachedPages().includes(this.dataService.activePage())) {
      this.dataService.cachedPages().push(this.dataService.activePage()) ;
      this.dataService.pageNumber.set(pageNumber);
    }
  }

  protected exportExcel() {
    console.log(this.goodTypesList());
  }
}
