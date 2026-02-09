import {computed, inject, Injectable, linkedSignal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {ProcurementsModel, TaskModels} from '../../models/tasks-models';
import {ConfigService} from '../config/config-service';
import {CreateProcurement} from '../../models/inventory-model';
import {catchError} from 'rxjs/operators';
import DataService from '../data-service';
import {BaseCollectionName, paginatedResult, PaginationHeader, TaskModelsCollectionName} from '../../models/base-model';
import {BehaviorSubject, Observable} from "rxjs";
import * as url from 'node:url';
import {toObservable} from '@angular/core/rxjs-interop';
import {BaseItem} from '../../models/goods-models';


@Injectable({
  providedIn: 'root',
})
export class InventoryService extends DataService<TaskModelsCollectionName> {

  readonly http = inject(HttpClient);
  readonly config = inject(ConfigService);
  readonly apiUrl = this.config.apiUrl;

  activePage = signal(1);
  pageNumber =signal<number>(1);
  pageSize =signal<number>(20);
  cachedPages: number[]=[];

  cache = linkedSignal({
    source: () => ({
      data: this.#taskList.value(),
      activePage: this.activePage(),
    }),
    computation: (source, previous) => {
      const currentList = (previous?.value ?? []) as TaskModels[];
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
    const pagedData = this.cache() as TaskModels[][];
    const currentPage = this.activePage();
    if (pagedData[currentPage]) {
      return pagedData[currentPage];
    }
    return this.#taskList.value() ?? [];
  });

  header = computed<PaginationHeader>(
    () => this.#taskList.hasValue() ? JSON.parse(this.#taskList.headers()?.get('X-Pagination') ?? '{}'): {}
  )

  #taskList = httpResource<TaskModels[]>( () => ({
    url: `${this.apiUrl}/v1/tasks`,
    params: {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    },
    method: 'GET',
    defaultValue:[]
  }))

  refresh(){
    this.#taskList.reload();
    this.cachedPages=[];
  }
  updateItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  createItem(item: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
  createProcurementTask(task : CreateProcurement){
    return this.http.post(`${this.apiUrl}/v1/tasks/procurement`,task).pipe(
      catchError((error) => {
        console.error('Error creating procurement task:', error);
        throw error;
      })
    );
  }

  deleteItem(id: number) {
    this.http.delete(`${this.apiUrl}/v1/tasks/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting task:', error);
        throw error;
      })
    ).subscribe( () => this.#taskList.reload());
  }
}
