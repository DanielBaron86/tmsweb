import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {TasksService} from '../../../services/inventory/tasks-service';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {TaskTypes, TaskTypesStatus} from '../../../models/status-enums';
import {DropdownDirective} from '../../../directives/dropdown-directive';

@Component({
  selector: 'app-tasks-list-component',
  imports: [
    ButtonComponent,
    DatePipe,
    EnumToStringPipe,
    DropdownDirective
  ],
  templateUrl: './tasks-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit{
  ngOnInit(): void {
      console.log('TasksListComponent initialized',this.tasksService.taskList.value());
  }
  tasksService = inject(TasksService);
  protected readonly TaskTypes = TaskTypes;
  protected readonly TaskTypesStatus = TaskTypesStatus;
}
