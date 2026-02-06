import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {AuthServices} from '../../../services/auth/auth.services';
import GoodsTypesService from '../../../services/goods/goods-types-service';
import {CreateProcurement, GoodsOrder} from '../../../models/inventory-model';
import {LocationUnitModel} from '../../../models/location-models';
import {FormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';
import {LabelComponent} from '../../../components/form/label/label-component';
import {GoodsTypesModel} from '../../../models/goods-models';
import {InventoryService} from '../../../services/inventory/inventory.service';
@Component({
  selector: 'app-procurement-add-component',
  imports: [
    FormsModule,
    InputFieldComponent,
    LabelComponent,
  ],
  templateUrl: './procurement-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcurementAddComponent {

  readonly auth = inject(AuthServices)
  readonly goodTypesService = inject(GoodsTypesService)
  readonly inventoryService = inject(InventoryService)
  readonly userProfile = this.auth.userProfile()
 itemsTobeAdded = signal<GoodsOrder[]>([])
 taskDescription = signal('')



  selectedLocation = signal<LocationUnitModel>({
    id: 0,
    locationTypeID: 0,
    address: '',
    description: '',
    locationTypesEntity: null
  });
  protected AddItemToList($event: GoodsTypesModel) {
    const itemToBeAdded: GoodsOrder = {
      goodTypeId: $event.id,
      goodType: $event.name,
      location: this.selectedLocation()?.id,
      quantity: 1
    }
  if (this.itemsTobeAdded().find( (item) => item.goodTypeId === itemToBeAdded.goodTypeId)){
    return;
  }else{
    itemToBeAdded.location = this.selectedLocation()?.id;
    this.itemsTobeAdded.update( (items) => [...items, itemToBeAdded])
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
    const createProcurement : CreateProcurement ={
      creatorId: this.userProfile.id,
      userName: this.userProfile.username,
      description: this.taskDescription(),
      goodsOrder: this.itemsTobeAdded()
    }
    console.log(createProcurement);
    this.inventoryService.createProcurementTask(createProcurement).subscribe( (data) => {
      console.log(data);
    })
  }
}
