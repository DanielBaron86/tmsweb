import {
  ChangeDetectionStrategy,
  Component, computed,
  inject,
  input, linkedSignal,
  signal,
} from '@angular/core';
import {FulfillGoodsModel, FulfilmentModel, ReturnFulfillTask} from '../../../models/tasks-models';
import {DatePipe} from '@angular/common';
import {GoodsStatusEnum, TaskTypesStatus, UserTypeEnum} from '../../../models/status-enums';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {UserService} from '../../../services/users/user-service';
import {InventoryService} from '../../../services/inventory/inventory.service';
import DataService from '../../../services/data-service';
import {LabelComponent} from '../../../components/form/label/label-component';
import {FormsModule} from '@angular/forms';
import {form, Field, required, min,max, submit, validate, customError} from '@angular/forms/signals';
import {QueryFilters} from '../../../models/query-models';
import {LocationService} from '../../../services/location/location-service';
import {SelectedOption, SelectWithSearch} from '../../../components/form/select-with-search/select-with-search';
import {AuthServices} from '../../../services/auth/auth.services';
import {TaskServices} from '../../../services/tasks/task-services';



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
export class ViewTaskProcurement  {

  readonly dataService = inject(DataService) as InventoryService;
  readonly userService = inject(UserService)
  readonly locationService = inject(LocationService)
  readonly auth = inject(AuthServices)
  readonly taskService =inject(TaskServices)

  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;
  protected readonly GoodsStatusEnum = GoodsStatusEnum;

  id = input.required<number>();

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

  /**
  @summary Get locations of type Supplier and build dropdown options
  **/
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


  /**
   @summary Get procurement task by id and build form fields
   **/
  receivedTask = this.taskService.getProcurementTaskByIdWithFactory(() =>this.id())



  /**
   @summary Get task creator profile to display creator name in the form
   **/
  userProfile = this.userService.getUserById(() => {
    const task = this.receivedTask.value();
    return task ? task.creatorId : undefined;
  });

  supplierId = signal<number>(0);
  subTaskId =signal<number>(0)
  goodsBySubTask = signal<Record<number, FulfillGoodsModel[]>>({});


  /**
   @summary Create basic fulfillment items for each subtask
   **/
  baseItems = computed(() => {
    const profile = this.auth.userProfile();
    const task = this.receivedTask.value();
    const supplierId = this.supplierId();

    if (!profile || !task || supplierId === null) return [];

    return task.tasksEntitiesProcurements.map(i => ({
      supplier: supplierId,
      subTaskId: i.id,
      userId: profile.id
    }));
  });


  /**
   @summary Add fulfillment goods to each item
   **/
  itemsToCreate = computed(() => {
    const goodsMap = this.goodsBySubTask();

    return this.baseItems().map(item => ({
      ...item,
      fulfillGoodsModels: goodsMap[item.subTaskId] ?? []
    })) as FulfilmentModel[];
  });


  addFulfillmentGood(subTaskId: number, good: any) {
    const findSubTask = this.receivedTask.value().tasksEntitiesProcurements.find(item => item.id === subTaskId);
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

  removeFulfillmentGood(subTaskId: number, index: number,serialNumber: string) {
    this.serialNumbers.delete(serialNumber);
    this.goodsBySubTask.update(map => ({
      ...map,
      [subTaskId]: map[subTaskId].filter((_, i) => i !== index)
    }));
  }

  summary = linkedSignal({
    source: () => this.receivedTask.value(),
    computation: () => {
      const total = this.receivedTask.value().tasksEntitiesProcurements.reduce((acc, val) => acc + val.quantity, 0);
      const remaining = this.receivedTask.value().tasksEntitiesProcurements.reduce((acc, val) => acc + val.remainingQuantity, 0);
      return {total, remaining}
    }
  })



  goodsOptions = computed( () => {
    const mappedItems =  this.receivedTask.value()?.tasksEntitiesProcurements
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
    min(path.quantity, 1, {message: 'Quantity cannot be less than 1'});
    max(path.quantity, 1, {message: 'Quantity cannot be more than 1'});
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
      itemModel.serialNumber = itemModel.serialNumber.toUpperCase();
      this.addFulfillmentGood(this.subTaskId(),itemModel);
    });
  }

  protected OnChangeItemType(value: string) {
    this.subTaskId.set(parseInt(value));

  }

  protected ReceiveLocation(value: any) {
    this.supplierId.set(value.value);
    this.showForm.set(true);
  }

  showResponse = signal(false);
  responseMessage = signal<ReturnFulfillTask | null>(null);
  protected SaveTask() {
      this.taskService.fullfillProcurementTask(this.id(),this.itemsToCreate()).subscribe( (data) => {
        this.goodsBySubTask.set({})
        this.responseMessage.set(data as ReturnFulfillTask)
        this.receivedTask.reload()
      } )
  }

}
