import {computed, inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {BaseItem, GoodsModels, GoodsTypesModel, v_GoodsTypesInstances} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {
  ItemInstanceCollectionName,
  paginatedResult, PaginationHeader,
} from '../../models/base-model';
import DataService from '../data-service';
import {BehaviorSubject, Observable} from "rxjs";
import {QueryFilters} from '../../models/query-models';
import {LocationUnitModel} from '../../models/location-models';


@Injectable({
  providedIn: 'root',
})
export default class GoodsInstancesService extends DataService<ItemInstanceCollectionName> {

  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
  queryFilters = signal<QueryFilters | null>(null);
  cachedPages: number[]=[];

  readonly goodsResource = httpResource<v_GoodsTypesInstances[]>(() => {
    const filters = this.queryFilters();
    const pageNumber = this.pageNumber();
    const pageSize= this.pageSize()

    return filters
      ? { url: `${this.apiUrl}/v1/goods_instance/query`, method: 'POST', body: filters, params: { pageNumber,pageSize } }
      : { url: `${this.apiUrl}/v1/goods_instance/view`, method: 'GET', params: { pageNumber,pageSize } };
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
          [source.activePage]: source.data // Store data under its page number key
        };
      }
      return currentList;
    }
  });

  displayItems = computed(() => {
    const pagedData = this.cache() as v_GoodsTypesInstances[][];
    const currentPage = this.activePage();
    console.log('displayItems',pagedData,currentPage);
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.goodsResource.value() ?? [];
  });

  header = computed<PaginationHeader>(
    () => this.goodsResource.hasValue() ? JSON.parse(this.goodsResource.headers()?.get('X-Pagination') ?? '{}'): {}
  )


  setActivePage(page: number){
   // console.log('setting active page to:', page);
    this.activePage.set(page);
    // this.pageNumber.set(page);
  }

  updateItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  createItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }


}
