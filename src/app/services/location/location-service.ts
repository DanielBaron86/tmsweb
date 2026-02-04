import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {LocationUnitModel} from '../../models/location-models';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  get locations(){
    return this.#location.asReadonly()
  }

  #location = httpResource<LocationUnitModel[]>(() => ({
    url: `${this.apiUrl}/v1/locations`,
    method: 'GET',
    defaultValue: signal<Location[]>([])
  }));
}
