import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { GoodsTypesModel } from '../../../models/goods-models';
import GenericDataService from '../../../services/data-service';
import GoodsTypesService from '../../../services/goods/goods-types-service';
import { PaginationComponent } from '../pagination-component/pagination-component';
import { QueryBuilder } from '../query-builder/query-builder';
import { QueryFilters } from '../../../models/query-models';
import { SelectedOption } from '../../form/select-with-search/select-with-search';

@Component({
  selector: 'app-good-types-search-component',
  imports: [PaginationComponent, QueryBuilder],
  templateUrl: './good-types-search-component.html',
  providers: [{ provide: GenericDataService, useExisting: GoodsTypesService }],
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
  dataService = inject(GenericDataService) as GoodsTypesService;
  headerInfo = this.dataService.header;

  isOpen = signal(false);
  toggleText = computed(() => (this.isOpen() ? 'Close' : 'Open'));
  dropdownMenu = viewChild<ElementRef<HTMLElement>>('dropdownMenu');
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );

  availableOptions: SelectedOption[] = [
    { value: 'Id', text: 'Id' },
    { value: 'name', text: 'Name' },
    { value: 'description', text: 'Description' },
  ];

  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }

  location = input<number>(0);
  selectItem = output<GoodsTypesModel>();

  protected EmitItem(item: GoodsTypesModel) {
    if (!item) {
      return;
    }
    this.selectItem.emit(item);
  }

  protected ReceiveFilters($event: QueryFilters) {
    this.dataService.search($event);
  }
}
