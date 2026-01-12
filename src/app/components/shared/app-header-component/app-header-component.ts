import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar-service';
import { ThemeToggleButtonComponent } from '../theme-toggle-button-component/theme-toggle-button-component';
import { NotificationDropdownComponent } from '../notification-dropdown-component/notification-dropdown-component';
import { UserDropdownComponent } from '../user-dropdown-component/user-dropdown-component';

@Component({
  selector: 'app-header',
  imports: [ThemeToggleButtonComponent,NotificationDropdownComponent,UserDropdownComponent],
  templateUrl: './app-header-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  
  readonly sidebarService = inject(SidebarService);
  isApplicationMenuOpen = signal(false);

   handleToggle() {
    if (window.innerWidth >= 1280) {
      this.sidebarService.toggleExpanded();
    } else {
      this.sidebarService.toggleMobileOpen();
    }
  }

   toggleApplicationMenu() {
    this.isApplicationMenuOpen.update( (value) => !value);
  }

}
