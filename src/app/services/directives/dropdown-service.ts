import {Injectable, signal} from '@angular/core';
import {DropdownDirective} from '../../directives/dropdown-directive';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  readonly activeDropdown = signal<unknown | null>(null);
  toggle(instance: unknown) {
    // If clicking the already open one, close it; otherwise, set the new one
    this.activeDropdown.update(current => current === instance ? null : instance);
  }
}
