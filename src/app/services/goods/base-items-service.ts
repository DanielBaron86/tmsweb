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
  stupid = new BehaviorSubject(0);
  activePage = signal(1);
  cachedPages = signal<number[]>([]);

  testCaheP : number[] = [];

  http = inject(HttpClient);

  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

   itemTypes(){
    return !!this.#baseTypes.hasValue();
  }

#cahedItems : BaseCollectionName[] =[];
clearCache(){
  this.#cahedItems=[];
}

  getCollectionList() {
    return   linkedSignal({
      source: () => this.#baseTypes.value(),
      computation: () => {
        if (this.#baseTypes.hasValue()) {
          const headers = JSON.parse(this.#baseTypes.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.pageNumber()]={pageNumber : this.pageNumber(),collectionName : this.#baseTypes.value()}
          const returnedObject: paginatedResult<BaseCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<BaseCollectionName[]> = {
            result: [{pageNumber : 0,collectionName : []}],
            paginationHeader: {
              TotalItemCount: 0,
              TotalPageCount: 0,
              PageSize: 0,
              CurrentPage:0
            }
          }
          return returnedObject;
        }
      }
    })
  }


  cache = linkedSignal({
    source: () => ({
      data: this.#baseTypes.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as BaseItem[];
      if (source.data && !this.testCaheP.includes(source.activePage)) {
        this.testCaheP.push(source.activePage);
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

    // Fallback: If not in cache, show the live resource value
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

  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
}
