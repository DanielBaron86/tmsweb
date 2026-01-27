import { inject, Injectable, Injector, linkedSignal, signal} from '@angular/core';
import {BaseItem, GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {paginatedResult} from '../../models/base-model';
import {map, switchMap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export default class GoodsService {

  http = inject(HttpClient);
  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';

  get goodstypes(){
    return this.#goodstypes.asReadonly()
  }

  get baseTypes(){
    return this.#baseTypes;
  }

  baseItemById (baseId :number): BaseItem  {
    return (this.getbaseTypesList())().result.filter(b => b.id == baseId)[0];
  }
   baseTypesHeaders(){
    this.http.get(`${this.apiUrl}/v1/goods/base_goods`,{observe:'response' } ).subscribe(res => {
      console.log(res.headers.get('X-Pagination'))
      console.log(res.headers.get('Authorization'))
    })
  }

  get itemList(){
    return this.#itemList.asReadonly()
  }

  readonly #goodstypes = httpResource<GoodsTypesModel[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods/goodtypes`,
    method: 'GET',
    defaultValue:  signal<GoodsTypesModel[]>([])
  }));

  baseTypesPageNumber =signal<number>(1);
  baseTypesPageSize =signal<number>(20);

  readonly #baseTypes = httpResource <BaseItem[]>(() => ({
    params: {
      pageNumber: this.baseTypesPageNumber(),
      pageSize: this.baseTypesPageSize()
    },
    url: `${this.apiUrl}/v1/goods/base_goods`,
    method: 'GET',
    observe: 'response',
    defaultValue: signal<BaseItem[]>([])
  }));

  getbaseTypesList() {
   return   linkedSignal({
      source: () => this.#baseTypes.value(),
      computation: () => {
        if (this.#baseTypes.hasValue()) {
          const headers = JSON.parse(this.#baseTypes.headers()?.get('X-Pagination') ?? '{}');
          const returnedObject: paginatedResult<BaseItem> = {
            result: this.#baseTypes.value(),
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<BaseItem> = {
            result: [],
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

  readonly #itemList = httpResource<GoodsModels[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));

  updateBaseItem(baseItem: BaseItem) {
   return this.http.put<BaseItem>(`https://tmsapi.danielsplaygrounds.com/api/v1/goods/base_goods/${baseItem.id}`, baseItem).pipe(
     catchError((error) => {
       return throwError(() => error);
     })
   )
  }

  createBaseItem(baseItem: BaseItem) {
    return this.http.post<BaseItem>(`https://tmsapi.danielsplaygrounds.com/api/v1/goods/base_goods`, baseItem).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

}
