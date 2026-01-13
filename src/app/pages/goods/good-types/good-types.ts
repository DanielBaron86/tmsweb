import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {GoodsService} from '../../../services/goods/goods-service';

@Component({
  selector: 'app-good-types',
  imports: [],
  templateUrl: './good-types.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypes {
  readonly  goodService = inject(GoodsService);

  goodTypesList  = this.goodService.getGoodTypes()
}
