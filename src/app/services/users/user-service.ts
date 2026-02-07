import {inject, Injectable, Injector} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {UserResource} from '../../models/user-models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly injector = inject(Injector);
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;



  getUserById(id: number){
    return httpResource<UserResource>( () => `${this.apiUrl}/v1/users/${id}`, {
      injector: this.injector
    });

  }
}
