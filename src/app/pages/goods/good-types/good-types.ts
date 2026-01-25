import {ChangeDetectionStrategy, Component, inject, linkedSignal, OnInit, signal} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';
import {AuthServices} from '../../../services/auth/auth.services';
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
  goodService = inject(GoodsService);
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
}
