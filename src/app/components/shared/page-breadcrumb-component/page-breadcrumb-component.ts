import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-page-breadcrumb',
  imports: [],
  templateUrl: './page-breadcrumb-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageBreadcrumbComponent {
  pageTitle = input<string>('')
}
