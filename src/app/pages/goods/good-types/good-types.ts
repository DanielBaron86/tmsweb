import {
  ChangeDetectionStrategy,
  Component, contentChildren,
  ElementRef,
  inject,
  linkedSignal,
  viewChildren
} from '@angular/core';
import GoodsTypesService from '../../../services/goods/./goods-types-service';
import {ButtonComponent} from "../../../components/ui/button-component/button-component";

@Component({
  selector: 'app-good-types',
    imports: [
        ButtonComponent
    ],
  templateUrl: './good-types.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypes {
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('goodTypeList');

  goodService = inject(GoodsTypesService);
  goodTypesList = linkedSignal({
    source: () => this.goodService.goodstypes.value(),
    computation: () => {
      if (this.goodService.goodstypes.hasValue()) {
        return this.goodService.goodstypes.value();
      } else {
        return [];
      }
    }
  })

  protected onSearchInput($event: any) {
    this.goodTypesList()?.forEach( (val,index) => {
      const isMatch =val.name.toLowerCase().includes($event.target.value.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })

  }
}
