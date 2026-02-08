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
  testNumber = signal<number>(0);


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
 // testChache = computed(() => this.#baseTypes.hasValue() ? this.#baseTypes.value() :  [])


  cache = linkedSignal({
    source: () => ({
      data: this.#baseTypes.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as BaseItem[];
      console.log(this.cachedPages())
      console.log('this active page',source.activePage);
      this.stupid.next(source.activePage);
      if (source.data && !this.cachedPages().includes(source.activePage)) {
        return {
          ...currentList,
          [source.activePage]: source.data // Store data under its page number key
        };
      }
      return [];
    }
  });

  displayItems = computed(() => {
    const pagedData = this.cache() as BaseItem[][];
   //  console.log(pagedData);
    const currentPage = this.activePage();
    // console.log(currentPage);
    // Check if we have the data in cache first
    if (pagedData[currentPage]) {
     // console.log(' cache',pagedData[currentPage]);
      return pagedData[currentPage];
    }

    // Fallback: If not in cache, show the live resource value
    // (This handles the "first visit" to a page)
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
  pageSize =signal<number>(10);
}
