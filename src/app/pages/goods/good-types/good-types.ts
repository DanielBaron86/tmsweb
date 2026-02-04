import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  linkedSignal,
  viewChildren
} from '@angular/core';
import GoodsTypesService from '../../../services/goods/./goods-types-service';
import {ButtonComponent} from "../../../components/ui/button-component/button-component";
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {InventoryKey} from '../../../models/status-enums';

@Component({
  selector: 'app-good-types',
  imports: [
    ButtonComponent,
    SpinnerComponent,
    DatePipe,
    EnumToStringPipe
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
        console.log(this.goodService.goodstypes.value());
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

  protected readonly InventoryKey = InventoryKey;
}
