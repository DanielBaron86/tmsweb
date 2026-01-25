import {ChangeDetectionStrategy, Component } from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';

@Component({
  selector: 'app-tasks-list-component',
  imports: [
    ButtonComponent
  ],
  templateUrl: './tasks-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {

}
