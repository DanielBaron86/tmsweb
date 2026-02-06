import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {GoodsModels, GoodsTypesModel, v_GoodsTypesInstances} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {
  BaseCollectionName,
  ItemInstanceCollectionName,
  paginatedResult,
  TypesCollectionName
} from '../../models/base-model';


@Injectable({
  providedIn: 'root',
})
export default class GoodsInstancesService {

  http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  get itemList(){
    return this.#itemList.asReadonly()
  }

  cachedPages = signal<number[]>([1]);
  #cahedItems : ItemInstanceCollectionName[] =[];
  clearCache(){
    this.#cahedItems=[];
  }

  getInstancesList() {
    return   linkedSignal({
      source: () => this.#itemList.value(),
      computation: () => {
        if (this.#itemList.hasValue()) {
          const headers = JSON.parse(this.#itemList.headers()?.get('X-Pagination') ?? '{}');
          this.#cahedItems[this.instanceTypesPageNumber()]={pageNumber : this.instanceTypesPageNumber(),collectionName : this.#itemList.value()}
          const returnedObject: paginatedResult<ItemInstanceCollectionName[]> = {
            result:  this.#cahedItems,
            paginationHeader: headers
          }

          return returnedObject;
        } else {
          const returnedObject: paginatedResult<ItemInstanceCollectionName[]> = {
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

  readonly #itemList = httpResource<v_GoodsTypesInstances[]>(() => ({
    params: {
      pageNumber: 1,
      pageSize: 10
    },
    url: `${this.apiUrl}/v1/goods_instance/view`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));

  instanceTypesPageNumber =signal<number>(1);
  InstanceTypesPageSize =signal<number>(20);
}
