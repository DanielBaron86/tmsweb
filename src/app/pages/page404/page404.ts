import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridShapeComponent } from '../../components/shared/grid-shape-component/grid-shape-component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page404',
  imports: [GridShapeComponent, RouterModule],
  templateUrl: './page404.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page404 {
  currentYear: number = new Date().getFullYear();
}
