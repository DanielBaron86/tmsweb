import {inject, Injectable, Injector} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {
  FulfillGoodsTransfer,
  FulfilmentModel,
  ProcurementsModel,
  TasksModelWithTransfer,
  TransferTask
} from '../../models/tasks-models';


@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;
  readonly injector = inject(Injector);
  procurementsModel : ProcurementsModel ={
    id:0,
    taskType: 0,
    taskStatus: 0,
    creatorId: 0,
    description: '',
    tasksEntitiesProcurements: []
  }

  transferModel: TasksModelWithTransfer ={
    id:0,
    taskType: 0,
    taskStatus: 0,
    creatorId: 0,
    description: '',
    tasksEntitiesTransferList: []
  }

  getProcurementTaskById(id: number){
    return   httpResource<ProcurementsModel>( ()=> `${this.apiUrl}/v1/tasks/procurement/${id}`)
  }

  getProcurementTaskByIdWithFactory(id: () => number){
    return   httpResource<ProcurementsModel>( ()=> `${this.apiUrl}/v1/tasks/procurement/${id()}`,{injector: this.injector, defaultValue: this.procurementsModel})
  }

  getTransferTaskByIdWithFactory(id: () => number){
    return   httpResource<TasksModelWithTransfer>( ()=> `${this.apiUrl}/v1/tasks/transfer/${id()}`,{injector: this.injector, defaultValue: this.transferModel})
  }


  fullfillProcurementTask(taskId: number,taskBody: FulfilmentModel[]){
    console.log(taskId,taskBody);
    return this.http.post(`${this.apiUrl}/v1/operations/procurements/${taskId}`,taskBody)
  }

  createTransferTask(taskBody: TransferTask) {
    return this.http.post(`${this.apiUrl}/v1/tasks/transfer`,taskBody)
  }

  fulfillTransferTask(taskId: number,taskBody: FulfillGoodsTransfer){
    return this.http.post(`${this.apiUrl}/v1/operations/transfers/${taskId}`,taskBody)
  }

}
