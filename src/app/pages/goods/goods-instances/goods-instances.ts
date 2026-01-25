import {ChangeDetectionStrategy, Component, inject, linkedSignal} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-goods-instances',
  imports: [
    ButtonComponent,DatePipe
  ],
  templateUrl: './goods-instances.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsInstances {

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

}
