import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { CartModelWithDetails } from '../../models/stores-models';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { QueryFilters } from '../../models/query-models';
import { PaginationHeader } from '../../models/base-model';
import DataService from '../data-service';

@Injectable({
  providedIn: 'root',
})
export class CartsServices extends DataService<CartModelWithDetails> {
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly cartsResource = httpResource<CartModelWithDetails[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();

    return filters
      ? {
          url: `${this.apiUrl}/v1/stores/carts/query`,
          method: 'POST',
          body: filters,
          params: { pageNumber, pageSize },
        }
      : {
          url: `${this.apiUrl}/v1/stores/carts`,
          method: 'GET',
          params: { pageNumber, pageSize },
        };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.cartsResource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as CartModelWithDetails[];
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
    const pagedData = this.cache() as CartModelWithDetails[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage].reverse();
    }
    return this.cartsResource.value()?.reverse() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    //'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local';
    if (this.cartsResource.status() !== 'resolved') {
      return {};
    }
    return JSON.parse(this.cartsResource.headers()?.get('X-Pagination') ?? '{}');
  });

  selectCartId = signal<number | null>(null);
  selectedCart = computed(() => {
    const cache = this.cache() as Record<number, CartModelWithDetails[]>;
    const id = this.selectCartId();
    if (!id) return null;
    return (
      Object.values(cache)
        .flat()
        .find((register) => register.id === id) ?? null
    );
  });

  refresh() {
    this.cachedPages = [];
    this.queryFilters.set(null);
    this.cache.update(() => []);
    this.activePage.set(1);
    this.pageNumber.set(1);
    this.cartsResource.reload();
  }
  search(newFilters: QueryFilters) {
    this.cachedPages = [];
    this.cache.update(() => []);
    this.queryFilters.set(newFilters);
    this.activePage.set(1);
    this.pageNumber.set(1);
  }

  GetCartById(param: () => number) {
    return httpResource<CartModelWithDetails>(() => {
      const id = param();
      return {
        url: `${this.apiUrl}/v1/stores/${id}`,
        method: 'GET',
      };
    });
  }
}
