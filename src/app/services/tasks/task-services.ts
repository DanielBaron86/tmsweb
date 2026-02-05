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
}
