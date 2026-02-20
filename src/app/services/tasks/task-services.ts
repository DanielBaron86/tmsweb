import {inject, Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {FulfilmentModel, ProcurementsModel} from '../../models/tasks-models';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

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

  getProcurementTaskById(id: number){
    return   httpResource<ProcurementsModel>( ()=> `${this.apiUrl}/v1/tasks/procurement/${id}`)
  }

  getProcurementTaskByIdWithFactory(id: () => number){
    return   httpResource<ProcurementsModel>( ()=> `${this.apiUrl}/v1/tasks/procurement/${id()}`,{injector: this.injector, defaultValue: this.procurementsModel})
  }
  fullfillProcurementTask(taskId: number,taskBody: FulfilmentModel[]){
    console.log(taskId,taskBody);
    return this.http.post(`${this.apiUrl}/v1/operations/procurements/${taskId}`,taskBody)
  }

}
