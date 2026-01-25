import {computed, inject, Injectable, linkedSignal, signal} from '@angular/core';
import {BaseItem, GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {AuthServices} from '../auth/auth.services';
import {paginatedResult, PaginationHeader} from '../../models/base-model';

@Injectable({
  providedIn: 'root',
})
class GoodsService {

  http = inject(HttpClient);
  AuthServices= inject(AuthServices);
  /*readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';*/
  readonly apiUrl = 'https://tmsapi.danielsplaygrounds.com/api';

  get goodstypes(){
    return this.#goodstypes.asReadonly()
  }

  get baseTypes(){
    return this.#baseTypes;
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


  etag = computed(() => {
    const res = this.#baseTypes?.headers();
    return res?.get('etag') ?? null;
  });

  readonly #itemList = httpResource<GoodsModels[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));






}

export default GoodsService
