import {
  ChangeDetectionStrategy,
  Component, computed,
  ElementRef,
  inject,
  linkedSignal,
  OnInit, signal,
  viewChildren
} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';
import {BaseItem} from '../../../models/goods-models';
@Component({
  selector: 'app-base-types',
  imports: [ ButtonComponent,DatePipe],
  templateUrl: './base-types-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTypesComponent {
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('baseList');
  activePage = signal<number>(1);
  goodService = inject(GoodsService);

  baseTypesList =this.goodService.getbaseTypesList();


  pageNumbers = computed(() =>
    Array.from({ length: this.baseTypesList().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );

  protected onSearchInput($event: any) {
    this.baseTypesList().result?.forEach( (val,index) => {
      const isMatch =val.description.toLowerCase().includes($event.target.value.toLowerCase()) || val.manufacturer.toLowerCase().includes($event.target.value.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }

  protected changePage(pageNumber: number) {
      this.goodService.baseTypesPageNumber.set(pageNumber);
      this.activePage.set(pageNumber);
  }

  protected decreasePage() {

    this.activePage() < 2 ? this.activePage.set(this.baseTypesList().paginationHeader.TotalPageCount) : this.activePage.set(this.activePage() - 1);
    this.goodService.baseTypesPageNumber.set(this.activePage());
  }

  protected increasePage(){
    this.activePage() > this.baseTypesList().paginationHeader.TotalPageCount-1 ? this.activePage.set(1) : this.activePage.set(this.activePage() + 1);
    this.goodService.baseTypesPageNumber.set(this.activePage());
  }
}
