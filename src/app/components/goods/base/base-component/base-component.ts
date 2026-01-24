import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {BaseItem} from '../../../../models/goods-models';


@Component({
  selector: 'app-base-component',
  imports: [],
  templateUrl: './base-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {
  baseItem = input.required<BaseItem>();
}
