import {InjectionToken, WritableSignal} from '@angular/core';
import { paginatedResult} from '../models/base-model';
import {BehaviorSubject, Observable} from 'rxjs';

export default abstract class DataService<T> {
  abstract pageNumber: WritableSignal<number>
  abstract activePage : WritableSignal<number>
  abstract cachedPages : number[]
  abstract updateItem(item: any): Observable<any>
  abstract createItem(item: any): Observable<any>
}
