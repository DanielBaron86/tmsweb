import {ChangeDetectionStrategy, Component, inject, linkedSignal, OnInit} from '@angular/core';
import {BaseComponent} from '../../../components/goods/base/base-component/base-component';
import GoodsService from '../../../services/goods/goods-service';
import goodsService from '../../../services/goods/goods-service';
import {BaseItem} from '../../../models/goods-models';

@Component({
  selector: 'app-base-types-component',
  imports: [BaseComponent],
  templateUrl: './base-types-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTypesComponent implements OnInit {
  goodService = inject(GoodsService);
  test = linkedSignal({
    source: () => this.goodService.baseTypes.value(),
    computation: () => {
      if (this.goodService.baseTypes.hasValue()) {
        return this.goodService.baseTypes.value();
      } else {
        return [];
      }
    }
  })

  ngOnInit(): void {
    console.log('OnInit BaseTypesComponent',this.test());
  }

  protected updateBaseTypes() {
    const newitem = {id: 5, goodModelBaseTypeId: 5, description: 'Test', manufacturer: 'Test',createdDate: new Date(),updatedDate : new Date()};
    this.test.update( (state) => [...state, newitem])
  }
}
