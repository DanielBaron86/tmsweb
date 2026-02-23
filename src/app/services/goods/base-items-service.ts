import {computed, effect, inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource, HttpResponse} from '@angular/common/http';
import {BaseItem, GoodsTypesModel} from '../../models/goods-models';
import {BaseCollectionName, paginatedResult, PaginationHeader} from '../../models/base-model';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {ConfigService} from '../config/config-service';
import DataService from '../data-service';
import {QueryFilters} from '../../models/query-models';

@Injectable({
  providedIn: 'root',
})
export default class BaseItemsService extends DataService<BaseCollectionName> {

  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[]=[];

  readonly baseResourceResource = httpResource<BaseItem[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize= this.pageSize()

    return filters
      ? { url: `${this.apiUrl}/v1/goods_instance/query`, method: 'POST', body: filters, params: { pageNumber,pageSize } }
      : { url: `${this.apiUrl}/v1/goods_base`, method: 'GET', params: { pageNumber,pageSize } };
  });

  cache = linkedSignal({
    source: () => ({
      data: this.baseResourceResource.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as BaseItem[];
      if (source.data && !this.cachedPages.includes(source.activePage)) {
        this.cachedPages.push(source.activePage);
        return {
          ...currentList,
          [source.activePage]: source.data // Store data under its page number key
        };
      }
      return currentList;
    }
  });

  displayItems = computed(() => {
    const pagedData = this.cache() as BaseItem[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.baseResourceResource.value() ?? [];
  });

  header = computed<PaginationHeader>(
    () => this.baseResourceResource.hasValue() ? JSON.parse(this.baseResourceResource.headers()?.get('X-Pagination') ?? '{}'): {}
  )



refresh(){
  this.baseResourceResource.reload();
  //this.cachedPages=[];
}

  updateItem(baseItem: BaseItem) {
    return this.http.put<BaseItem>(`${this.apiUrl}/v1/goods_base/${baseItem.id}`, baseItem).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  createItem(baseItem: BaseItem) {
    return this.http.post<BaseItem>(`${this.apiUrl}/v1/goods_base`, baseItem).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

}
