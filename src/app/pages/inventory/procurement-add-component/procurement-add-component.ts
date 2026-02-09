import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {AuthServices} from '../../../services/auth/auth.services';
import {CreateProcurement, GoodsOrder} from '../../../models/inventory-model';
import {LocationUnitModel} from '../../../models/location-models';
import {FormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';
import {LabelComponent} from '../../../components/form/label/label-component';
import {GoodsTypesModel} from '../../../models/goods-models';
import {InventoryService} from '../../../services/inventory/inventory.service';
import {LocationSearchComponent} from '../../../components/shared/location-search-component/location-search-component';
import {
  GoodTypesSearchComponent
} from '../../../components/shared/good-types-search-component/good-types-search-component';
import {Router} from '@angular/router';
import {AlertComponent} from '../../../components/ui/alert-component/alert-component';
@Component({
  selector: 'app-procurement-add-component',
  imports: [
    FormsModule,
    InputFieldComponent,
    LabelComponent,
    LocationSearchComponent,
    GoodTypesSearchComponent,
    AlertComponent,
  ],
  templateUrl: './procurement-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcurementAddComponent {

  readonly router = inject(Router)
  readonly inventoryService = inject(InventoryService)
  readonly auth = inject(AuthServices)
  readonly userProfile = this.auth.userProfile()

  showAlert = signal(false)
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
    if (this.taskDescription() === '') {
      this.showAlert.set(true);
      return;
    }

    const createProcurement : CreateProcurement ={
      creatorId: this.userProfile.id,
      userName: this.userProfile.username,
      description: this.taskDescription(),
      goodsOrder: this.itemsTobeAdded()
    }
    this.inventoryService.createProcurementTask(createProcurement).subscribe({
      next: (res) =>  {
        this.inventoryService.refresh();
        this.router.navigate(['/inventory/tasks']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
