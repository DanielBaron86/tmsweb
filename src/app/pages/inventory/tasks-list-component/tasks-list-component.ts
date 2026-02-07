import {ChangeDetectionStrategy, Component, computed, inject, OnInit, WritableSignal} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {InventoryService} from '../../../services/inventory/inventory.service';
import {DatePipe} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {TaskTypes, TaskTypesStatus} from '../../../models/status-enums';
import {DropdownDirective} from '../../../directives/dropdown-directive';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {Router} from '@angular/router';
import DataService from '../../../services/data-service';
import {BaseCollectionName, paginatedResult} from '../../../models/base-model';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';

@Component({
  selector: 'app-tasks-list-component',
  imports: [
    DatePipe,
    EnumToStringPipe,
    DropdownDirective,
    SpinnerComponent,
    ButtonComponent,
    PaginationComponent
  ],
  templateUrl: './tasks-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent{
  readonly router = inject(Router);
  readonly dataService = inject(DataService) as InventoryService;
  protected readonly TaskTypes = TaskTypes;
  protected readonly TaskTypesStatus = TaskTypesStatus;

  taskList =this.dataService.getCollectionList();
  pageNumbers = computed(() =>
    Array.from({ length: this.taskList().paginationHeader.TotalPageCount }, (_, i) => i + 1)
  );

  protected NavigateTo(s: string) {
    console.log(s);
    this.router.navigate([s]);
  }
}
