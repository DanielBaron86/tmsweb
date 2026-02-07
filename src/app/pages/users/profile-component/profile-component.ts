import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-profile',
  imports: [
    BlankComponent
  ],
  templateUrl: './profile-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

}
