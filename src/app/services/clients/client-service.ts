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
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;
  readonly injector = inject(Injector);

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly accountsResourceResource = httpResource<UserResource[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();

    return filters
      ? {
          url: `${this.apiUrl}/v1/clients/query`,
          method: 'POST',
          body: filters,
          params: { pageNumber, pageSize },
        }
      : { url: `${this.apiUrl}/v1/clients`, method: 'GET', params: { pageNumber, pageSize } };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.accountsResourceResource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as UserResource[];
      if (source.data && !this.cachedPages.includes(source.activePage)) {
        this.cachedPages.push(source.activePage);
        return {
          ...currentList,
          [source.activePage]: source.data, // Store data under its page number key
        };
      }
      return currentList;
    },
  });

  displayItems = computed(() => {
    const pagedData = this.cache() as UserResource[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.accountsResourceResource.value() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    //'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local';
    if (this.accountsResourceResource.status() !== 'resolved') {
      return {};
    }
    return JSON.parse(this.accountsResourceResource.headers()?.get('X-Pagination') ?? '{}');
  });
  refresh() {
    this.cachedPages = [];
    this.queryFilters.set(null);
    this.cache.update(() => []);
    this.activePage.set(1);
    this.pageNumber.set(1);
    this.accountsResourceResource.reload();
  }
  search(newFilters: QueryFilters) {
    this.cachedPages = [];
    this.cache.update(() => []);
    this.queryFilters.set(newFilters);
    this.activePage.set(1);
    this.pageNumber.set(1);
  }

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
