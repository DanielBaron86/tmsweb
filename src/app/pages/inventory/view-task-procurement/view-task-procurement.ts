import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  input, linkedSignal, OnInit,
  signal,
} from '@angular/core';
import {FulfillGoodsModel, FulfilmentModel, ProcurementsModel} from '../../../models/tasks-models';
import {DatePipe} from '@angular/common';
import {TaskTypesStatus, UserTypeEnum} from '../../../models/status-enums';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {UserService} from '../../../services/users/user-service';
import {InventoryService} from '../../../services/inventory/inventory.service';
import DataService from '../../../services/data-service';
import {LabelComponent} from '../../../components/form/label/label-component';
import {FormsModule} from '@angular/forms';
import {form, Field, required, min, submit, validate, customError} from '@angular/forms/signals';
import {QueryFilters} from '../../../models/query-models';
import {LocationService} from '../../../services/location/location-service';
import {SelectedOption, SelectWithSearch} from '../../../components/form/select-with-search/select-with-search';
import {AuthServices} from '../../../services/auth/auth.services';



@Component({
  selector: 'app-view-task-procurement',
  imports: [
    DatePipe,
    EnumToStringPipe,
    LabelComponent,
    FormsModule,
    Field,
    SelectWithSearch
  ],
  templateUrl: './view-task-procurement.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaskProcurement {

  readonly dataService = inject(DataService) as InventoryService;
  readonly userService = inject(UserService)
  readonly locationService = inject(LocationService)
  readonly auth = inject(AuthServices)

  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;

  showForm = signal(false);
  queryFilters =signal<QueryFilters>(
    {
      pageNumber: 1,
      pageSize: 100,
      queryFields: [
        {
          "method": "where",
          "keyField": "LocationTypeID",
          "keyValue": "4"
        }
      ]
    }
  )
  locationOptions = this.locationService.getLocationsWithFilters(this.queryFilters)
  options = linkedSignal({
    source: () =>this.locationOptions.value(),
    computation : () => {
      const options: SelectedOption[] = [];
      if (this.locationOptions.hasValue()) {
        this.locationOptions.value().forEach((item) => {
          options.push({value: item.id.toString(), text: item.address+' - '+ item.description})
        })
        return options
      }
      return options
    }
    })

  id = input.required<number>();
  task = input.required<ProcurementsModel>();
  userProfile = this.userService.getUserById(( () =>this.task().creatorId));

  supplierId = signal<number>(0);
  baseItems = computed(() => {
    const profile = this.auth.userProfile();
    const task = this.task();
    const supplierId = this.supplierId();

    if (!profile || !task || supplierId === null) return [];

    return task.tasksEntitiesProcurements.map(i => ({
      supplier: supplierId,
      subTaskId: i.id,
      userId: profile.id
    }));
  });
  goodsBySubTask = signal<Record<number, FulfillGoodsModel[]>>({});
  itemsToCreate = computed(() => {
    const goodsMap = this.goodsBySubTask();

    return this.baseItems().map(item => ({
      ...item,
      fulfillmentGoods: goodsMap[item.subTaskId] ?? []
    })) as FulfilmentModel[];
  });

  subTaskId =signal<number>(0)
  addFulfillmentGood(subTaskId: number, good: any) {
    const findSubTask = this.task().tasksEntitiesProcurements.find(item => item.id === subTaskId);
   if (!findSubTask) return;
   if (this.goodsBySubTask()[findSubTask.id] !== undefined && this.goodsBySubTask()[findSubTask.id].length > findSubTask.remainingQuantity-1){
     return
   }else {
     this.goodsBySubTask.update(map => ({
       ...map,
       [subTaskId]: [...(map[subTaskId] ?? []), good]
     }));
   }
  }

  removeFulfillmentGood(subTaskId: number, index: number) {
    this.goodsBySubTask.update(map => ({
      ...map,
      [subTaskId]: map[subTaskId].filter((_, i) => i !== index)
    }));
  }

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
        .map( (item) => ({itemValue: item.id, itemText: item.goodType})) ?? []

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
  fulfillGoodsForm = form(this.fulfillGoodsModel , path =>{
    required(path.serialNumber, {message: 'Serial Number is required'});
    required(path.price, {message: 'Price is required'});
    min(path.price, 1, {message: 'Price cannot be less than 1'});
    validate(path.price, c=>{
      const value = c.value()
      if (Math.round(value * 100) === value * 100){return undefined}
      return customError({message: 'Price can have maximum 2 decimal places'})
    })
  })


  serialNumbers = new Set<string>();
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.fulfillGoodsForm().invalid()) {
      this.fulfillGoodsForm().markAsTouched();
      return;
    }
    if(this.serialNumbers.has(this.fulfillGoodsModel().serialNumber)){
      return
    }else{
      this.serialNumbers.add(this.fulfillGoodsModel().serialNumber)
    }
    submit(this.fulfillGoodsForm, async () => {
      const itemModel = this.fulfillGoodsModel();
      this.addFulfillmentGood(this.subTaskId(),itemModel);
    });
    // console.log(this.itemsToCreate())

  }

  protected OnChangeItemType(value: string) {
    this.subTaskId.set(parseInt(value));
    // console.log(this.baseItems())
    // console.log(this.task())

  }



  protected ReceiveLocation(value: any) {
    this.supplierId.set(value.value);
    this.showForm.set(true);
  }
}
