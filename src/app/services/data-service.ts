import { WritableSignal } from '@angular/core';
export default abstract class DataService<T> {
  abstract pageNumber: WritableSignal<number>;
  abstract activePage: WritableSignal<number>;
  abstract cachedPages: number[];

  setActivePage(pageNumber: number, b: boolean) {}
}
