import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  inject,
  linkedSignal,
  signal,
  viewChildren
} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {GoodsStatusEnum} from '../../../models/status-enums';
import GoodsInstancesService from '../../../services/goods/goods-instances-service';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';

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
  goodsInstancesService = inject(GoodsInstancesService);
  protected readonly GoodsStatusEnum = GoodsStatusEnum;
  activePage = signal<number>(1);

  goodsListInstances = this.goodsInstancesService.getCollectionList();
  pageNumbers = computed(() =>
    Array.from({ length: this.goodsListInstances().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );
  protected onSearchInput($event: any) {
    this.filterTableByString($event.target.value);
  }

  protected filterTableByString(filterValue: string) {
    this.goodsListInstances().result[this.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.serialNumber.toLowerCase().includes(filterValue.toLowerCase()) || val.manufacturer.toLowerCase().includes(filterValue.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected filterTableById(filterValue: number) {
    this.goodsListInstances().result[this.activePage()]?.collectionName.forEach( (val,index) => {
      const isMatch =val.id == filterValue
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected decreasePage() {
    this.activePage() < 2 ? this.activePage.set(this.goodsListInstances().paginationHeader.TotalPageCount) : this.activePage.set(this.activePage() - 1);
    if (!this.goodsInstancesService.cachedPages().includes(this.activePage())) {
      this.goodsInstancesService.pageNumber.set(this.activePage());
      this.goodsInstancesService.cachedPages().push(this.activePage()) ;
    }

  }

  protected increasePage() {
    this.activePage() > this.goodsListInstances().paginationHeader.TotalPageCount-1 ? this.activePage.set(1) : this.activePage.set(this.activePage() + 1);
    if (!this.goodsInstancesService.cachedPages().includes(this.activePage())) {
      this.goodsInstancesService.pageNumber.set(this.activePage());
      this.goodsInstancesService.cachedPages().push(this.activePage()) ;
    }
  }

  protected changePage(pageNumber: number) {
    this.activePage.set(pageNumber);
    if (!this.goodsInstancesService.cachedPages().includes(this.activePage())) {
      this.goodsInstancesService.cachedPages().push(this.activePage()) ;
      this.goodsInstancesService.pageNumber.set(pageNumber);
    }

  }
}
