import {computed, contentChild, Directive, effect, ElementRef, inject} from '@angular/core';
import {DropdownService} from '../services/directives/dropdown-service';

@Directive({
  selector: '[appDropdownDirective]',
  host: {
    '(click)': 'toggleDropdown($event)',
  }
})
export class DropdownDirective {

  constructor() {
    effect(() => {
      const menuEl = this.menu()?.nativeElement;
      if (menuEl) {
        menuEl.style.display = this.isOpen() ? 'block' : 'none';
      }
    });
  }

  readonly service = inject(DropdownService);
  readonly menu = contentChild<ElementRef<HTMLElement>>('dropDown');
  readonly isOpen = computed(() => this.service.activeDropdown() === this);


  protected toggleDropdown(event: Event) {
    console.log('clicked DropdownDirective',this.menu()?.nativeElement);
    event.stopPropagation(); // Stop click from bubbling up
    this.service.toggle(this)
  }
}
