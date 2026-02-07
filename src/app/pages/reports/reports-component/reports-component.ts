import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-reports-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './reports-component.html',
  styleUrl: './reports-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {

}
