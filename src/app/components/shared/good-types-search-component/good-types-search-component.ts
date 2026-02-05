import {ChangeDetectionStrategy, Component, effect, ElementRef, input, output, signal, viewChild} from '@angular/core';
import {GoodsTypesModel} from '../../../models/goods-models';
import {GoodsOrder} from '../../../models/inventory-model';

@Component({
  selector: 'app-good-types-search-component',
  imports: [],
  templateUrl: './good-types-search-component.html',
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
  isOpen = signal(false)

  dropdownMenu = viewChild<ElementRef<HTMLElement>>("dropdownMenu");

  protected Toogle() {
    this.isOpen.set(!this.isOpen());
  }


  listItems = input<GoodsTypesModel[]>();
 location = input<number>(0);
  selectItem = output<GoodsTypesModel>();

  protected EmitItem(item: GoodsTypesModel) {
    if (!item) {return;}
    this.selectItem.emit( item );
  }
}
