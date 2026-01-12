import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DropdownItemTwoComponent } from '../dropdown-item-two-component/dropdown-item-two-component';
import { DropdownComponent } from '../dropdown-component/dropdown-component';

@Component({
  selector: 'app-user-dropdown',
  imports: [DropdownComponent,DropdownItemTwoComponent],
  templateUrl: './user-dropdown-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent {

   isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

}
