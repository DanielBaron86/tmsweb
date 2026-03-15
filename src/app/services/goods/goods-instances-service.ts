import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { v_GoodsTypesInstances } from '../../models/goods-models';
import { HttpClient, httpResource } from '@angular/common/http';
import { ConfigService } from '../config/config-service';
import { ItemInstanceCollectionName, PaginationHeader } from '../../models/base-model';
import DataService from '../data-service';
import { Observable } from 'rxjs';
import { QueryFilters } from '../../models/query-models';

interface GoodsResponse {
  data: v_GoodsTypesInstances[];
  pagination: PaginationHeader;
}

@Injectable({
  providedIn: 'root',
})
export default class GoodsInstancesService extends DataService<ItemInstanceCollectionName> {
  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[] = [];

  readonly goodsResource = httpResource<v_GoodsTypesInstances[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize = this.pageSize();
    return this.queryFilters()
      ? { url: `${this.apiUrl}/v1/goods_instance/view/query`, method: 'POST', body: filters }
      : {
          url: `${this.apiUrl}/v1/goods_instance`,
          method: 'GET',
          params: { pageNumber, pageSize },
        };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.goodsResource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as v_GoodsTypesInstances[];
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
    const pagedData = this.cache() as v_GoodsTypesInstances[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.goodsResource.value() ?? [];
  });

  header = computed<PaginationHeader>(() => {
    //'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local';
    if (this.goodsResource.status() !== 'resolved') {
      return {};
    }
    return JSON.parse(this.goodsResource.headers()?.get('X-Pagination') ?? '{}');
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
  updateItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  createItem(item: any): Observable<any> {
    throw new Error('Method not implemented.');
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
    this.goodsResource.reload();
  }
}
