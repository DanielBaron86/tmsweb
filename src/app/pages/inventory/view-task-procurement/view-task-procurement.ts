import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  input, linkedSignal,
  OnInit, signal,
} from '@angular/core';
import {FulfillGoodsModel, ProcurementsModel} from '../../../models/tasks-models';
import {DatePipe} from '@angular/common';
import {TaskTypesStatus, UserTypeEnum} from '../../../models/status-enums';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {UserService} from '../../../services/users/user-service';
import {HttpResourceRef} from '@angular/common/http';
import {UserResource} from '../../../models/user-models';
import {InventoryService} from '../../../services/inventory/inventory.service';
import DataService from '../../../services/data-service';
import {LabelComponent} from '../../../components/form/label/label-component';
import {FormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';
import {form, Field} from '@angular/forms/signals';


@Component({
  selector: 'app-view-task-procurement',
  imports: [
    DatePipe,
    EnumToStringPipe,
    LabelComponent,
    FormsModule,
    Field
  ],
  templateUrl: './view-task-procurement.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaskProcurement implements OnInit {
  dataService = inject(DataService) as InventoryService;
  userService = inject(UserService)

  userProfile: HttpResourceRef<UserResource | undefined> | undefined;

  ngOnInit(): void {
    this.userProfile = this.userService.getUserById(this.task().creatorId)
    console.log(this.task())

  }

  id = input.required<number>();
  task = input.required<ProcurementsModel>();
  summary = linkedSignal({
    source: () => this.task(),
    computation: () => {
      const total = this.task().tasksEntitiesProcurements.reduce((acc, val) => acc + val.quantity, 0);
      const remaining = this.task().tasksEntitiesProcurements.reduce((acc, val) => acc + val.remainingQuantity, 0);
      return {total, remaining}
    }
  })
  goodsOptions = computed( () => {
    const mappedItems =  this.task()?.tasksEntitiesProcurements
        .map( (item) => ({itemValue: item.goodTypeId, itemText: item.goodType})) ?? []

    return [
      { itemValue: null, itemText: 'Select a good...' },
      ...mappedItems
    ];
    })

   fulfillGoodsModel =signal<FulfillGoodsModel>({
    price: 0,
    serialNumber: '',
    quantity: 1
  })
  fulfillGoodsForm = form(this.fulfillGoodsModel)
  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;

  protected OnChange(value: string) {
    console.log(value)
  }
}
