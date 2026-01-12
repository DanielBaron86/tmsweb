import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  template: `
    @if (isOpen()) {
<div
  #dropdownRef
  [class]="'absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ' + className"
>
  <ng-content></ng-content>
</div>
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  isOpen = input(false);
  close =  output<void>();
  className = input('');
}
