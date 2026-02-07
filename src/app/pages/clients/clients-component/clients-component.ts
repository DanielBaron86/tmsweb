import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-clients-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './clients-component.html',
  styleUrl: './clients-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {

}
