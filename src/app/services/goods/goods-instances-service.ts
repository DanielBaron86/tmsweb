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
  cachedPages: number[]=[];

  cache = linkedSignal({
    source: () => ({
      data: this.#itemList.value(),
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
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.#itemList.value() ?? [];
  });

  header = computed<PaginationHeader>(
    () => this.#itemList.hasValue() ? JSON.parse(this.#itemList.headers()?.get('X-Pagination') ?? '{}'): {}
  )


  readonly #itemList = httpResource<v_GoodsTypesInstances[]>(() => ({
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    },
    url: `${this.apiUrl}/v1/goods_instance/view`,
    method: 'GET',
    defaultValue: signal<GoodsModels[]>([])
  }));

  updateItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  createItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }


}
