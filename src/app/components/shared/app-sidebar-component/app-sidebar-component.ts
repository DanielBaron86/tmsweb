import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { SidebarWidgetComponent } from './sidebar-widget-component';
import { SidebarService } from '../../../services/sidebar/sidebar-service';
import { Router, RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../../pipes/safe-html-pipe';
import { navItemsList,NavItem } from './menu-items-list';



@Component({
  selector: 'app-sidebar',
  imports: [SidebarWidgetComponent,SafeHtmlPipe,RouterModule],
  templateUrl: './app-sidebar-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {

 readonly  sidebarService = inject(SidebarService);
 readonly  router = inject(Router);
 readonly cdr = inject(ChangeDetectorRef);
 
 openSubmenu: string | null | number = null;
 subMenuHeights: { [key: string]: number } = {};

   navItems: NavItem[] = navItemsList;

   onSidebarMouseEnter() {
    this.sidebarService.setHovered(true);
   }

   toggleSubmenu(section: string, index: number){
    const key = `${section}-${index}`;
    const el = document.getElementById(key);
    
    if (el) {
      console.log('Element:', el.scrollHeight);
    }

    if (this.openSubmenu === key) {
      this.openSubmenu = null;
      this.subMenuHeights[key] = 0;
    } else {
      this.openSubmenu = key;

      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) {
          this.subMenuHeights[key] = el.scrollHeight;
          this.cdr.detectChanges(); // Ensure UI updates
        }
      });
    }
   }

   onSubmenuClick() {}

    isActive(path: string): boolean {
    return this.router.url === path;
  }

}
