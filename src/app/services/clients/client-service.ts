import { computed, inject, Injectable, Injector, linkedSignal, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { QueryFilters } from '../../models/query-models';
import { PaginationHeader } from '../../models/base-model';
import { CreateUser, EditUser, UserResource } from '../../models/user-models';
import DataService from '../data-service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends DataService<UserResource> {

   // ① tell the base class which endpoints to use
  protected override readonly config: DataServiceConfig = {
    getUrl:   `${this.appConfig.apiUrl}/v1/clients`,
    queryUrl: `${this.appConfig.apiUrl}/v1/clients/query`,
  };
  protected override readonly accountsResourceResource = this.buildResource(this.config);
  getUserById(idFactory: () => number | undefined) {
    return httpResource<UserResource>(
      () => {
        const id = idFactory();
        if (id === undefined || id == 0) return undefined;
        return `${this.apiUrl}/v1/clients/${id}`;
      },
      {
        injector: this.injector,
      },
    );
  }

  updateUser(user: EditUser, userId: number) {
    return this.http.put<EditUser>(`${this.apiUrl}/v1/clients/${userId}`, user).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.detail));
      }),
    );
  }

  createUser(createUser: CreateUser) {
    return this.http.post<UserResource>(`${this.apiUrl}/v1/clients`, createUser).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.detail));
      }),
    );
  }
}
