import {ChangeDetectionStrategy, Component, ElementRef, inject, linkedSignal, viewChildren} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {GoodsStatusEnum} from '../../../models/status-enums';

@Component({
  selector: 'app-goods-instances',
  imports: [
    ButtonComponent,DatePipe,EnumToStringPipe
  ],
  templateUrl: './goods-instances.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsInstances {
  readonly tableList = viewChildren<ElementRef<HTMLTableRowElement>>('instancesList');
  goodService = inject(GoodsService);
  goodsListInstances = linkedSignal({
    source: () => this.goodService.itemList.value(),
    computation: () => {
      if (this.goodService.itemList.hasValue()) {
        return this.goodService.itemList.value();
      } else {
        return [];
      }
    }
  })
  protected readonly GoodsStatusEnum = GoodsStatusEnum;

  protected onSearchInput($event: any) {
    this.goodsListInstances()?.forEach( (val,index) => {
      const isMatch =val.goodsTypes?.name.toLowerCase().includes($event.target.value.toLowerCase()) || val.serialNumber.toLowerCase().includes($event.target.value.toLowerCase())
      this.tableList()[index].nativeElement.hidden = !isMatch
    })
  }
}
