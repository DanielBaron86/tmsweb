import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {

     #isExpandedSubject = signal<boolean>(true);
     #isMobileOpenSubject = signal<boolean>(false);
     #isHoveredSubject = signal<boolean>(false);

    readonly isExpanded = this.#isExpandedSubject.asReadonly();
    readonly isMobileOpen = this.#isMobileOpenSubject.asReadonly();
    readonly isHovered = this.#isHoveredSubject.asReadonly(); 

  setExpanded(val: boolean) {
    this.#isExpandedSubject.set(val);
  }

  toggleExpanded() {
    this.#isExpandedSubject.set(!this.#isExpandedSubject());
  }

  setMobileOpen(val: boolean) {
    this.#isMobileOpenSubject.set(val);
  }

  toggleMobileOpen() {
    this.#isMobileOpenSubject.set(!this.#isMobileOpenSubject());
  }

  setHovered(val: boolean) {
    this.#isHoveredSubject.set(val);  
  }
}
