import { computed, inject, Injectable, Injector, linkedSignal, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { QueryFilters } from '../../models/query-models';
import { PaginationHeader } from '../../models/base-model';
import GenericDataService from '../data-service';
import {
  CashRegisterModel,
  CreateCashRegisterModel,
  CreateSessionModel,
} from '../../models/stores-models';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistersServices extends GenericDataService<CashRegisterModel> {
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;
  readonly injector = inject(Injector);

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly registersResource = httpResource<CashRegisterModel[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();

    return filters
      ? {
          url: `${this.apiUrl}/v1/stores/cash_register/query`,
          method: 'POST',
          body: filters,
          params: { pageNumber, pageSize },
        }
      : {
          url: `${this.apiUrl}/v1/stores/cash_register`,
          method: 'GET',
          params: { pageNumber, pageSize },
        };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.registersResource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as CashRegisterModel[];
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
    const pagedData = this.cache() as CashRegisterModel[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.registersResource.value() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    //'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local';
    if (this.registersResource.status() !== 'resolved') {
      return {};
    }
    return JSON.parse(this.registersResource.headers()?.get('X-Pagination') ?? '{}');
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
  refresh() {
    this.cachedPages = [];
    this.queryFilters.set(null);
    this.cache.update(() => []);
    this.activePage.set(1);
    this.pageNumber.set(1);
    this.registersResource.reload();
  }
  search(newFilters: QueryFilters) {
    this.cachedPages = [];
    this.cache.update(() => []);
    this.queryFilters.set(newFilters);
    this.activePage.set(1);
    this.pageNumber.set(1);
  }

  CreateRegister(createCashRegisterModel: CreateCashRegisterModel) {
    return this.http.post<CashRegisterModel>(
      `${this.apiUrl}/v1/stores/create_register`,
      createCashRegisterModel,
    );
  }

  UpdateRegister(id: number, createCashRegisterModel: CreateCashRegisterModel) {
    return this.http.put<CashRegisterModel>(
      `${this.apiUrl}/v1/stores/cash_register/${id}`,
      createCashRegisterModel,
    );
  }

  selecteRegisterdId = signal<number | null>(null);
  selectedRegister = computed(() => {
    const cache = this.cache() as Record<number, CashRegisterModel[]>;
    const id = this.selecteRegisterdId();
    console.log(this.selecteRegisterdId(), cache);
    if (!id) return null;
    return (
      Object.values(cache)
        .flat()
        .find((register) => register.id === id) ?? null
    );
  });
  getRegisterById(id: number | string): CashRegisterModel | undefined {
    const cache = this.cache() as Record<number, CashRegisterModel[]>;

    return Object.values(cache)
      .flat()
      .find((register) => register.id === id);
  }
  getRegister(param: () => number) {}

  CreateSession(createSessionModel1: CreateSessionModel) {
    return this.http.post(`${this.apiUrl}/v1/stores/open_session`, createSessionModel1).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.detail));
      }),
    );
  }
}
