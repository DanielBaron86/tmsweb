import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BlankComponent} from "../../../components/shared/blank-component/blank-component";

@Component({
  selector: 'app-tasks-component',
    imports: [
        BlankComponent
    ],
  templateUrl: './tasks-component.html',
  styleUrl: './tasks-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {

}
