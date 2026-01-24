import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';
import {AuthServices} from '../../../services/auth/auth.services';

@Component({
  selector: 'app-good-types',
  imports: [],
  templateUrl: './good-types.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodTypes {
  readonly  goodService = inject(GoodsService);
}
