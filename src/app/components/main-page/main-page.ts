import { Component, inject } from '@angular/core';
import { AppSidebarComponent } from '../shared/app-sidebar-component/app-sidebar-component';
import { AppHeaderComponent } from '../shared/app-header-component/app-header-component';
import { BackdropComponent } from '../shared/backdrop-component/backdrop-component';
import { SidebarService } from '../../services/sidebar/sidebar-service';
import { RouterModule } from '@angular/router';
import {ButtonComponent} from '../ui/button-component/button-component';
import {AuthServices} from '../../services/auth/auth.services';

@Component({
  selector: 'app-main-page',
  imports: [AppSidebarComponent, BackdropComponent, AppHeaderComponent, RouterModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  readonly sidebarService = inject(SidebarService);
  readonly authService = inject(AuthServices);

  protected refreshToken() {
    console.log('refreshToken');
    this.authService.refreshToken();
  }
}
