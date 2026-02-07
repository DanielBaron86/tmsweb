import { ChangeDetectionStrategy, Component } from '@angular/core';
import {PageBreadcrumbComponent} from '../page-breadcrumb-component/page-breadcrumb-component';

@Component({
  selector: 'app-blank',
  imports: [
    PageBreadcrumbComponent
  ],
  templateUrl: './blank-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankComponent {

}
