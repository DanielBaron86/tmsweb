import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DropdownItemTwoComponent } from '../dropdown-item-two-component/dropdown-item-two-component';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { AuthServices } from '../../../services/auth/auth.services';

@Component({
  selector: 'app-user-dropdown',
  imports: [DropdownComponent, DropdownItemTwoComponent],
  templateUrl: './user-dropdown-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent {
  readonly AuthServices = inject(AuthServices);

  doLogOut() {
    this.AuthServices.logout();
  }

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
