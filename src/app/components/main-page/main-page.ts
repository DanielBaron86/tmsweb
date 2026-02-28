import { Component, inject } from '@angular/core';
import { AppSidebarComponent } from '../shared/app-sidebar-component/app-sidebar-component';
import { AppHeaderComponent } from '../shared/app-header-component/app-header-component';
import { BackdropComponent } from '../shared/backdrop-component/backdrop-component';
import { SidebarService } from '../../services/sidebar/sidebar-service';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '../shared/toast-component/toast-component';

@Component({
  selector: 'app-main-page',
  imports: [
    AppSidebarComponent,
    BackdropComponent,
    AppHeaderComponent,
    RouterModule,
    ToastComponent,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  readonly sidebarService = inject(SidebarService);
}
