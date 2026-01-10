import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridShapeComponent } from '../../shared/grid-shape-component/grid-shape-component';
import { ThemeToggleTwoComponent } from '../../shared/theme-toggle-two-component/theme-toggle-two-component';

@Component({
  selector: 'app-auth-page-layout',
  imports: [GridShapeComponent,ThemeToggleTwoComponent],
  templateUrl: './auth-page-layout-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageLayoutComponent {

}
