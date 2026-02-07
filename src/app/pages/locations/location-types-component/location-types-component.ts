import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-location-types-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './location-types-component.html',
  styleUrl: './location-types-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationTypesComponent {

}
