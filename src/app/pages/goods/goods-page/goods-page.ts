import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MainPage} from '../../../components/main-page/main-page';
import {GoodsService} from '../../../services/goods/goods-service';

@Component({
  selector: 'app-goods-page',
  imports: [MainPage],
  templateUrl: './goods-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsPage {

}
