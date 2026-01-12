import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown-item-two',
  imports: [RouterModule],
  template: `
    <a
      [routerLink]="to()"
      [class]="combinedClasses()"
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemTwoComponent {

  to = input<string>('');
  baseClassName = input<string>('block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900');
  className = input<string>('');
  itemClick = output<void>();
  click = output<void>();

  combinedClasses = computed(() => {
    return `${this.baseClassName()} ${this.className()}`;
  });

  handleClick(event: Event): void {
    console.log('Dropdown item clicked:', event);
    this.itemClick.emit();
    this.click.emit();
  }
}
