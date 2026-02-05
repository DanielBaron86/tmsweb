import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {InventoryService} from '../../../services/inventory/inventory.service';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {TaskTypes, TaskTypesStatus} from '../../../models/status-enums';
import {DropdownDirective} from '../../../directives/dropdown-directive';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks-list-component',
  imports: [
    DatePipe,
    EnumToStringPipe,
    DropdownDirective,
    SpinnerComponent,
    ButtonComponent
  ],
  templateUrl: './tasks-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent{
  router = inject(Router);
  tasksService = inject(InventoryService);
  protected readonly TaskTypes = TaskTypes;
  protected readonly TaskTypesStatus = TaskTypesStatus;

  protected NavigateTo(s: string) {
    console.log(s);
    this.router.navigate([s]);
  }
}
