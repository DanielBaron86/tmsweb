import {computed, effect, inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource, HttpResponse} from '@angular/common/http';
import {BaseItem} from '../../models/goods-models';
import {BaseCollectionName, paginatedResult, PaginationHeader} from '../../models/base-model';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {ConfigService} from '../config/config-service';
import DataService from '../data-service';

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
  cachedPages: number[]=[];

  cache = linkedSignal({
    source: () => ({
      data: this.#baseTypes.value(),
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
    return this.#baseTypes.value() ?? [];
  });

  header = computed<PaginationHeader>(
    () => this.#baseTypes.hasValue() ? JSON.parse(this.#baseTypes.headers()?.get('X-Pagination') ?? '{}'): {}
  )

  readonly #baseTypes = httpResource <BaseItem[]>(() => ({
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    },
    url: `${this.apiUrl}/v1/goods_base`,
    method: 'GET',
    observe: 'response',
    defaultValue: []
  }));

refresh(){
  this.#baseTypes.reload();
  this.cachedPages=[];
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
