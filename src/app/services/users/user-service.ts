import {inject, Injectable, Injector, signal} from '@angular/core';
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


  defaultprofile =signal<UserResource>({
    email: '',
    firstName: '',
    lastName: '',
    userTypeId: 0,
    username: '',
    id: 0,
    createdDate: null,
    updatedDate: null,
  });
  getUserById(idFactory: () => number) {
    return httpResource<UserResource>(() => {
      const id = idFactory();
      return `${this.apiUrl}/v1/users/${id}`;
    }, {
      injector: this.injector,
      defaultValue: this.defaultprofile()
    });
  }
}
