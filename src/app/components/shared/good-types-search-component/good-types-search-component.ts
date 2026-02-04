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
  selectItem = output<GoodsOrder>();

  protected EmitItem(item: GoodsTypesModel, value: string) {
    if (value === '') {return;}
  let obj : GoodsOrder = {
    goodTypeId: item.id,
    goodType: item.name,
    location: this.location(),
    quantity: parseInt(value)
  }
    this.selectItem.emit( obj );
  }
}
