import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from '../../../components/shared/blank-component/blank-component';

@Component({
  selector: 'app-users-component',
  imports: [
    BlankComponent
  ],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {

}
