import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {GoodsModels, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {BaseCollectionName, paginatedResult, TypesCollectionName} from '../../models/base-model';


@Injectable({
  providedIn: 'root',
})
export default class GoodsTypesService {

  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  cachedPages = signal<number[]>([1]);
  #cahedItems : TypesCollectionName[] =[];
  clearCache(){
    this.#cahedItems=[];
  }

  getTypesList() {
    return   linkedSignal({
      source: () => this.#goodstypes.value(),
      computation: () => {
        if (this.#goodstypes.hasValue()) {
          const headers = JSON.parse(this.#goodstypes.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.typesPageNumber()]={pageNumber : this.typesPageNumber(),collectionName : this.#goodstypes.value()}
          const returnedObject: paginatedResult<TypesCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<TypesCollectionName[]> = {
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


  get goodstypes(){
    return this.#goodstypes.asReadonly()
  }

  readonly #goodstypes = httpResource<GoodsTypesModel[]>(() => ({
    params: {
      pageNumber: this.typesPageNumber(),
      pageSize: this.typesPageSize()
    },
    url: `${this.apiUrl}/v1/goods_type`,
    method: 'GET',
    defaultValue:  signal<GoodsTypesModel[]>([])
  }));

  typesPageNumber =signal<number>(1);
  typesPageSize =signal<number>(20);
}
