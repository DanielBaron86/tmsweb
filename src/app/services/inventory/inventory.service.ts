import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {TaskModels} from '../../models/tasks-models';
import {ConfigService} from '../config/config-service';
import {CreateProcurement} from '../../models/inventory-model';
import {catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  http = inject(HttpClient);
  config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;



  taskList = httpResource<TaskModels[]>( () => ({
    url: `${this.apiUrl}/v1/tasks`,
    method: 'GET',
    defaultValue:signal<TaskModels[]>([])
  }))

  createProcurementTask(task : CreateProcurement){
    return this.http.post(`${this.apiUrl}/v1/tasks/procurement`,task).pipe(
      catchError((error) => {
        console.error('Error creating procurement task:', error);
        throw error;
      })
    );
  }

}
