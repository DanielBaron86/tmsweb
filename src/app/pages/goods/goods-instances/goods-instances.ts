import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';

@Component({
  selector: 'app-goods-instances',
  imports: [],
  templateUrl: './goods-instances.html',
  styleUrl: './goods-instances.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsInstances {

  goodsService = inject(GoodsService);

}
