import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { QueryFilters } from '../../models/query-models';
import { LocationTypesModel } from '../../models/location-models';
import { PaginationHeader } from '../../models/base-model';
import DataService from '../data-service';

@Injectable({
  providedIn: 'root',
})
export class LocationTypesService extends DataService<LocationTypesModel> {
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly locationsTypesResource = httpResource<LocationTypesModel[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();

    return filters
      ? {
          url: `${this.apiUrl}/v1/goods_instance/query`,
          method: 'POST',
          body: filters,
        }
      : {
          url: `${this.apiUrl}/v1/locations/locationtype`,
          method: 'GET',
          params: { pageNumber, pageSize },
        };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.locationsTypesResource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as LocationTypesModel[];
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
    const pagedData = this.cache() as LocationTypesModel[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.locationsTypesResource.value() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    //'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local';
    if (this.locationsTypesResource.status() !== 'resolved') {
      return {};
    }
    return JSON.parse(this.locationsTypesResource.headers()?.get('X-Pagination') ?? '{}');
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
}
