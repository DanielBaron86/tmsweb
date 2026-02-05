import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateProcurement} from '../../models/inventory-model';
import {ConfigService} from '../config/config-service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  createProcurementTask(task : CreateProcurement){
    return this.http.post(`${this.apiUrl}/v1/tasks/procurement`,task).pipe(
      catchError((error) => {
        console.error('Error creating procurement task:', error);
        throw error;
      })
    );
  }
}
