import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  inject,
  viewChildren
} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {GoodsStatusEnum} from '../../../models/status-enums';
import GoodsInstancesService from '../../../services/goods/goods-instances-service';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';
import DataService from '../../../services/data-service';

@Component({
  selector: 'app-goods-instances',
  imports: [
    ButtonComponent, DatePipe, EnumToStringPipe, SpinnerComponent, PaginationComponent
  ],
  templateUrl: './goods-instances.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsInstances {
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('instancesList');
  dataService = inject(DataService) as GoodsInstancesService;
  protected readonly GoodsStatusEnum = GoodsStatusEnum;

  goodsListInstances  = this.dataService.getCollectionList();
  pageNumbers = computed(() =>
    Array.from({ length: this.goodsListInstances().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );
  protected onSearchInput($event: any) {
    this.filterTableByString($event.target.value);
  }

  protected filterTableByString(filterValue: string) {
    this.goodsListInstances().result[this.dataService.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.serialNumber.toLowerCase().includes(filterValue.toLowerCase()) || val.manufacturer.toLowerCase().includes(filterValue.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected filterTableById(filterValue: number) {
    this.goodsListInstances().result[this.dataService.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.id == filterValue
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }
}
