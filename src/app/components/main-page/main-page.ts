import { Component } from '@angular/core';
import { AppSidebarComponent } from '../shared/app-sidebar-component/app-sidebar-component';

@Component({
  selector: 'app-main-page',
  imports: [AppSidebarComponent],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {

}
