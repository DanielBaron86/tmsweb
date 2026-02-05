import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {GoodTypesSearchComponent} from '../../../components/shared/good-types-search-component/good-types-search-component';
import {AuthServices} from '../../../services/auth/auth.services';
import GoodsTypesService from '../../../services/goods/goods-types-service';
import {CreateProcurement, GoodsOrder} from '../../../models/inventory-model';
import {
  LocationSearchComponent
} from '../../../components/shared/location-search-component/location-search-component';
import {LocationUnitModel} from '../../../models/location-models';
import {FormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';
import {LabelComponent} from '../../../components/form/label/label-component';
import {TaskServices} from '../../../services/tasks/task-services';

@Component({
  selector: 'app-procurement-add-component',
  imports: [
    GoodTypesSearchComponent,
    LocationSearchComponent,
    FormsModule,
    InputFieldComponent,
    LabelComponent
  ],
  templateUrl: './procurement-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcurementAddComponent {

  readonly auth = inject(AuthServices)
  readonly goodTypesService = inject(GoodsTypesService)
  readonly taskServices = inject(TaskServices)

   obj : LocationUnitModel = {
    id: 0,
    locationTypeID: 0,
    address: '',
    description: '',
     locationTypesEntity: null
  }

  readonly userProfile = this.auth.userProfile()
 itemsTobeAdded = signal<GoodsOrder[]>([])
  taskDescription ='';

  itemList = this.goodTypesService.goodstypes;
  selectedLocation = signal<LocationUnitModel>(this.obj);
  protected AddItemToList($event: GoodsOrder) {
  if (this.itemsTobeAdded().find( (item) => item.goodTypeId === $event.goodTypeId)){
    return;
  }else{
    $event.location = this.selectedLocation()?.id;
    this.itemsTobeAdded.update( (items) => [...items, $event])
  }

  }



  protected RemoveItem($event: PointerEvent, item: GoodsOrder) {
    $event.preventDefault();
    this.itemsTobeAdded.update( (items) => items.filter( (i) => i.goodTypeId !== item.goodTypeId))
  }

  protected ReceiveLocation($event: LocationUnitModel) {
    this.selectedLocation.set($event);
    this.itemsTobeAdded().forEach( (item) => item.location = $event.id)
  }

  protected SaveTask() {
    const obj : CreateProcurement ={
      creatorId: this.userProfile.id,
      userName: this.userProfile.username,
      description: this.taskDescription,
      goodsOrder: this.itemsTobeAdded()
    }
    this.taskServices.createProcurementTask(obj).subscribe( (data) => {
      console.log(data);
    })
  }
}
