import {inject, Injectable} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {ProcurementsModel} from '../../models/tasks-models';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;
  getProcurementTaskById(id: number){
    return   httpResource<ProcurementsModel>( ()=> `${this.apiUrl}/v1/tasks/procurement/${id}`)
  }
}
