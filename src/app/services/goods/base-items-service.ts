import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {BaseItem} from '../../models/goods-models';
import {BaseCollectionName, paginatedResult} from '../../models/base-model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ConfigService} from '../config/config-service';

@Injectable({
  providedIn: 'root',
})
export default class BaseItemsService {
  http = inject(HttpClient);

  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  get baseTypes(){
    return this.#baseTypes;
  }

#cahedItems : BaseCollectionName[] =[];
clearCache(){
  this.#cahedItems=[];
}

  getbaseTypesList() {
    return   linkedSignal({
      source: () => this.#baseTypes.value(),
      computation: () => {
        if (this.#baseTypes.hasValue()) {
          const headers = JSON.parse(this.#baseTypes.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.baseTypesPageNumber()]={pageNumber : this.baseTypesPageNumber(),collectionName : this.#baseTypes.value()}
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

  cachedPages = signal<number[]>([1]);

  readonly #baseTypes = httpResource <BaseItem[]>(() => ({
    params: {
      pageNumber: this.baseTypesPageNumber(),
      pageSize: this.baseTypesPageSize()
    },
    url: `${this.apiUrl}/v1/goods_base`,
    method: 'GET',
    observe: 'response',
    defaultValue: signal<BaseItem[]>([])
  }));



  updateBaseItem(baseItem: BaseItem) {
    return this.http.put<BaseItem>(`${this.apiUrl}/v1/goods_base/${baseItem.id}`, baseItem).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  createBaseItem(baseItem: BaseItem) {
    return this.http.post<BaseItem>(`${this.apiUrl}/v1/goods_base`, baseItem).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  baseTypesPageNumber =signal<number>(1);
  baseTypesPageSize =signal<number>(20);
}
