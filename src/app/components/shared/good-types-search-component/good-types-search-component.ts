import {
  ChangeDetectionStrategy,
  Component, computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import {GoodsTypesModel} from '../../../models/goods-models';
import {GoodsOrder} from '../../../models/inventory-model';
import DataService from '../../../services/data-service';
import GoodsTypesService from '../../../services/goods/goods-types-service';
import {PaginationComponent} from '../pagination-component/pagination-component';

@Component({
  selector: 'app-good-types-search-component',
  imports: [
    PaginationComponent
  ],
  templateUrl: './good-types-search-component.html',
  providers: [
    {provide: DataService, useExisting: GoodsTypesService}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypesSearchComponent {
  constructor() {
    effect(() => {
      const menuEl = this.dropdownMenu()?.nativeElement;
      if (menuEl) {
        menuEl.style.display = this.isOpen() ? 'block' : 'none';
      }
    });
  }
  dataService = inject(DataService) as GoodsTypesService;
  headerInfo =this.dataService.header

  isOpen = signal(false)
  toggleText = computed(() => this.isOpen() ? 'Close' : 'Open');
  dropdownMenu = viewChild<ElementRef<HTMLElement>>("dropdownMenu");
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1)
  );


  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }



 location = input<number>(0);
  selectItem = output<GoodsTypesModel>();

  protected EmitItem(item: GoodsTypesModel) {
    if (!item) {return;}
    this.selectItem.emit( item );
  }
}
