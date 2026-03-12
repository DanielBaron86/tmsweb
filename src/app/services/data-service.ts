import { WritableSignal } from '@angular/core';
import { QueryFilters } from '../models/query-models';

// export default abstract class GenericDataService<T> {
//   abstract pageNumber: WritableSignal<number>;
//   abstract activePage: WritableSignal<number>;
//   abstract cachedPages: number[];
//
//   setActivePage(pageNumber: number, b: boolean) {}
// }

export abstract class DataService {
  abstract pageNumber: WritableSignal<number>;
  abstract activePage: WritableSignal<number>;
  abstract cachedPages: number[];
  setActivePage(pageNumber: number, b: boolean) {}
}

export default abstract class GenericDataService<T> extends DataService {
  abstract search(filters: QueryFilters): void;
}
