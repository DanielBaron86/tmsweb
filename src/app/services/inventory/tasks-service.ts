import {inject, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {TaskModels} from '../../models/tasks-models';
import {ConfigService} from '../config/config-service';



@Injectable({
  providedIn: 'root',
})
export class TasksService {
  config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;




  taskList = httpResource<TaskModels[]>( () => ({
    url: `${this.apiUrl}/v1/tasks`,
    method: 'GET',
    defaultValue:signal<TaskModels[]>([])
  }))

}
