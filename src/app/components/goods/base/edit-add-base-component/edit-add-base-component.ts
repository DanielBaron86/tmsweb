import {ChangeDetectionStrategy, Component, computed, inject, input, model, OnInit, signal} from '@angular/core';
import {ButtonComponent} from '../../../ui/button-component/button-component';
import {InputFieldComponent} from '../../../form/input/input-field-component/input-field-component';

import {FormsModule} from '@angular/forms';
import GoodsService from '../../../../services/goods/goods-service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {BaseItem} from '../../../../models/goods-models';

@Component({
  selector: 'app-edit-add-base-component',
  imports: [
    ButtonComponent,
    InputFieldComponent,
    FormsModule
  ],
  templateUrl: './edit-add-base-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAddBaseComponent  {

  goodsService  = inject(GoodsService);
  location = inject(Location)
  router = inject(Router);

  baseId = input<number>(1);
  baseItem =computed( ()=> {
    if(this.baseId()){
      return this.goodsService.baseItemById(this.baseId())

    }
    let obj: BaseItem= {  id :0 ,description:'' , manufacturer: ''}
    return obj;
  })



  readonly operation: string = this.router.currentNavigation()?.extras.state?.['operation'];


  protected onSave() {
    if (this.operation === 'edit' ){
      this.goodsService.updateBaseItem(this.baseItem())
    }else{
      this.goodsService.createBaseItem(this.baseItem())
    }

    this.location.back()
  }
}
