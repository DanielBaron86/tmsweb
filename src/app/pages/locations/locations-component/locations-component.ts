import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-locations-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './locations-component.html',
  styleUrl: './locations-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent {

}
