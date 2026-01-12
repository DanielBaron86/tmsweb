import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notification-dropdown',
  imports: [],
  templateUrl: './notification-dropdown-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationDropdownComponent {

  isOpen = false;
  notifying = false;

toggleDropdown() {
  this.isOpen = !this.isOpen;
}

}
