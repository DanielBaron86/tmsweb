import {computed, inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {BaseItem, GoodsTypesModel} from '../../models/goods-models';
import {HttpClient, httpResource} from '@angular/common/http';
import {ConfigService} from '../config/config-service';
import {paginatedResult, PaginationHeader, TypesCollectionName} from '../../models/base-model';
import DataService from '../data-service';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export default class GoodsTypesService extends DataService<TypesCollectionName> {

  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
  cachedPages: number[]=[];



  cache = linkedSignal({
    source: () => ({
      data: this.#goodstypes.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as GoodsTypesModel[];
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
    const pagedData = this.cache() as GoodsTypesModel[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.#goodstypes.value() ?? [];
  });

  header = computed<PaginationHeader>(
    () => this.#goodstypes.hasValue() ? JSON.parse(this.#goodstypes.headers()?.get('X-Pagination') ?? '{}'): {}
  )

  refresh(){
    this.#goodstypes.reload();
    this.cachedPages=[];
  }

  readonly #goodstypes = httpResource<GoodsTypesModel[]>(() => ({
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    },
    url: `${this.apiUrl}/v1/goods_type`,
    method: 'GET',
    defaultValue:  signal<GoodsTypesModel[]>([])
  }));

  updateItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  createItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }

}
