import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-stores-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './stores-component.html',
  styleUrl: './stores-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {

}
