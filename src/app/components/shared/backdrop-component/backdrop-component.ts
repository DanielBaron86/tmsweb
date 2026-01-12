import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar-service';

@Component({
  selector: 'app-backdrop',
  imports: [],
  template: `
    @if (sidebarService.isMobileOpen()) {
<div
  class="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
  (click)="closeSidebar()"
></div>
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackdropComponent {
  readonly sidebarService = inject(SidebarService);
  closeSidebar() {
    this.sidebarService.setMobileOpen(false);
}
}
