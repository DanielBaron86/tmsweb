import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  viewChildren,
} from '@angular/core';
import GoodsTypesService from '../../../services/goods/./goods-types-service';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import { DatePipe, LocationStrategy } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { InventoryKey } from '../../../models/status-enums';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';
import GenericDataService from '../../../services/data-service';

@Component({
  selector: 'app-good-types',
  imports: [ButtonComponent, SpinnerComponent, DatePipe, EnumToStringPipe, PaginationComponent],
  providers: [{ provide: GenericDataService, useExisting: GoodsTypesService }],
  templateUrl: './good-types.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypes {
  constructor() {
    effect(() => {
      this.location.replaceState(
        null,
        '',
        '/goods/base_types',
        `pageNumber=${this.dataService.activePage()}&pageSize=${this.headerInfo().PageSize}`,
      );
    });
  }

  dataService = inject(GenericDataService) as GoodsTypesService;
  location = inject(LocationStrategy);
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('goodTypeList');
  protected readonly InventoryKey = InventoryKey;

  headerInfo = this.dataService.header;
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );

  protected onSearchInput($event: any) {
    this.filterTableByString($event.target.value);
  }
  protected filterTableByString(filterValue: string) {
    this.dataService.displayItems().forEach((val, index) => {
      const isMatch =
        val.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        val.goodModelBaseTypeEntity?.manufacturer.toLowerCase().includes(filterValue.toLowerCase());
      this.tableList()[index].nativeElement.hidden = !isMatch;
    });
  }

  protected filterTableById(filterValue: number) {
    this.dataService.displayItems().forEach((val, index) => {
      const isMatch = val.id == filterValue;
      this.tableList()[index].nativeElement.hidden = !isMatch;
    });
  }

  protected exportExcel() {
    console.log(this.dataService.displayItems());
  }

  protected RefreshList() {
    this.dataService.refresh();
  }
}
