import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  inject,
  linkedSignal, signal,
  viewChildren
} from '@angular/core';
import GoodsTypesService from '../../../services/goods/./goods-types-service';
import {ButtonComponent} from "../../../components/ui/button-component/button-component";
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {InventoryKey} from '../../../models/status-enums';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';

@Component({
  selector: 'app-good-types',
  imports: [
    ButtonComponent,
    SpinnerComponent,
    DatePipe,
    EnumToStringPipe,
    PaginationComponent
  ],
  templateUrl: './good-types.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypes {
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('goodTypeList');

  goodService = inject(GoodsTypesService);
  goodTypesList = this.goodService.getTypesList()
  activePage = signal<number>(1);
  pageNumbers = computed(() =>
    Array.from({ length: this.goodTypesList().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );


  protected onSearchInput($event: any) {
  this.filterTableByString($event.target.value);
  }
  protected filterTableByString(filterValue: string) {
    this.goodTypesList().result[this.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.description.toLowerCase().includes(filterValue.toLowerCase()) || val.goodModelBaseTypeEntity?.manufacturer.toLowerCase().includes(filterValue.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected filterTableById(filterValue: number) {
    this.goodTypesList().result[this.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.id == filterValue
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected readonly InventoryKey = InventoryKey;

  protected decreasePage() {

  }

  protected increasePage() {

  }

  protected changePage($event: number) {

  }
}
