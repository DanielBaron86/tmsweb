import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { LocationUnitModel } from '../../models/location-models';
import DataService from '../data-service';
import { PaginationHeader } from '../../models/base-model';
import { Observable } from 'rxjs';
import { QueryFilters } from '../../models/query-models';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends DataService<LocationUnitModel> {
  override updateItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  override createItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly locationsTypesResource = httpResource<LocationUnitModel[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();

    return filters
      ? {
          url: `${this.apiUrl}/v1/locations/query`,
          method: 'POST',
          body: filters,
        }
      : {
          url: `${this.apiUrl}/v1/locations`,
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
      const currentList = (previous?.value ?? []) as LocationUnitModel[];
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
    const pagedData = this.cache() as LocationUnitModel[][];
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

  search(newFilters: QueryFilters) {
    this.cachedPages = [];
    this.queryFilters.set(newFilters);
    this.activePage.set(1);
    this.pageNumber.set(1);
  }
}
