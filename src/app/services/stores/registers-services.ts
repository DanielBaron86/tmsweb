import { computed, inject, Injectable, Injector, linkedSignal, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { QueryFilters } from '../../models/query-models';
import { PaginationHeader } from '../../models/base-model';
import DataService from '../data-service';
import { CashRegisterModel, CreateCashRegisterModel } from '../../models/stores-models';

@Injectable({
  providedIn: 'root',
})
export class RegistersServices extends DataService<CashRegisterModel> {
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

  CreateRegister(createCashRegisterModel1: CreateCashRegisterModel) {
    return this.http.post<CashRegisterModel>(
      `${this.apiUrl}/v1/stores/create_register`,
      createCashRegisterModel1,
    );
  }
}
