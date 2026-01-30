import {Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {TaskModels} from '../../models/tasks-models';



@Injectable({
  providedIn: 'root',
})
export class TasksService {
  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';




  taskList = httpResource<TaskModels[]>( () => ({
    url: `${this.apiUrl}/v1/tasks`,
    method: 'GET',
    defaultValue:signal<TaskModels[]>([])
  }))

}
