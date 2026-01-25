import {ChangeDetectionStrategy, Component, inject, linkedSignal, OnInit} from '@angular/core';
import GoodsService from '../../../services/goods/goods-service';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-base-types',
  imports: [ ButtonComponent,DatePipe],
  templateUrl: './base-types-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTypesComponent {
  goodService = inject(GoodsService);
  baseTypesList = linkedSignal({
    source: () => this.goodService.baseTypes.value(),
    computation: () => {
      if (this.goodService.baseTypes.hasValue()) {
        return this.goodService.baseTypes.value();
      } else {
        return [];
      }
    }
  })
}
