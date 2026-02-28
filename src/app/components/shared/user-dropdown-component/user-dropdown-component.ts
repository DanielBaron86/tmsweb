import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DropdownItemTwoComponent } from '../dropdown-item-two-component/dropdown-item-two-component';
import { DropdownComponent } from '../dropdown-component/dropdown-component';
import { AuthServices } from '../../../services/auth/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  imports: [DropdownComponent, DropdownItemTwoComponent],
  templateUrl: './user-dropdown-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent {
  readonly AuthServices = inject(AuthServices);
  readonly router = inject(Router);
  userProfile = this.AuthServices.userProfile;

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

  protected EditProfile(id: number) {
    this.isOpen = false;
    this.router.navigate([`/users/profile/${id}`]);
  }
}
