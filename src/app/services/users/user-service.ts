import { computed, inject, Injectable, Injector, linkedSignal, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { CreateUser, EditUser, UserResource } from '../../models/user-models';
import { QueryFilters } from '../../models/query-models';
import { PaginationHeader } from '../../models/base-model';
import DataService from '../data-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService<UserResource> {
  override updateItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  override createItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  readonly injector = inject(Injector);
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly usersResources = httpResource<UserResource[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();
    return this.queryFilters()
      ? { url: `${this.apiUrl}/v1/users/query`, method: 'POST', body: filters }
      : { url: `${this.apiUrl}/v1/users`, method: 'GET', params: { pageNumber, pageSize } };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.usersResources.value(),
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
    return this.usersResources.value() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    //'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local';
    if (this.usersResources.status() !== 'resolved') {
      return {};
    }
    return JSON.parse(this.usersResources.headers()?.get('X-Pagination') ?? '{}');
  });

  override setActivePage(pageNumber: number, hasFilters = false) {
    if (hasFilters && !this.cachedPages.includes(pageNumber)) {
      this.queryFilters.update((value) => {
        if (!value) return value;
        return { ...value, pageNumber: pageNumber };
      });
      this.activePage.set(pageNumber);
    } else {
      this.activePage.set(pageNumber);
    }

    if (!this.cachedPages.includes(pageNumber)) {
      this.pageNumber.set(pageNumber);
    }
  }

  search(newFilters: QueryFilters) {
    this.cachedPages = [];
    this.cache.update(() => []);
    this.queryFilters.set(newFilters);
    this.activePage.set(1);
    this.pageNumber.set(1);
  }

  refresh() {
    this.cachedPages = [];
    this.queryFilters.set(null);
    this.cache.update(() => []);
    this.activePage.set(1);
    this.pageNumber.set(1);
    this.usersResources.reload();
  }

  defaultprofile = signal<UserResource>({
    email: '',
    firstName: '',
    lastName: '',
    userTypeId: 0,
    username: '',
    id: 0,
    createdDate: null,
    updatedDate: null,
  });

  getUserById(idFactory: () => number | undefined) {
    return httpResource<UserResource>(
      () => {
        const id = idFactory();
        if (id === undefined || id == 0) return undefined;
        return `${this.apiUrl}/v1/users/${id}`;
      },
      {
        injector: this.injector,
      },
    );
  }

  createUser(createUser: CreateUser) {
    return this.http.post<UserResource>(`${this.apiUrl}/v1/users`, createUser).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.detail));
      }),
    );
  }

  updateUser(user: EditUser, userId: number) {
    return this.http.put<EditUser>(`${this.apiUrl}/v1/users/${userId}`, user).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.detail));
      }),
    );
  }
}
