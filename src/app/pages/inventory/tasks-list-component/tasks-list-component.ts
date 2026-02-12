import {ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, WritableSignal} from '@angular/core';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {InventoryService} from '../../../services/inventory/inventory.service';
import {DatePipe, LocationStrategy} from '@angular/common';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {TaskTypes, TaskTypesStatus} from '../../../models/status-enums';
import {DropdownDirective} from '../../../directives/dropdown-directive';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {Router} from '@angular/router';
import DataService from '../../../services/data-service';
import {PaginationComponent} from '../../../components/shared/pagination-component/pagination-component';

@Component({
  selector: 'app-tasks-list-component',
  imports: [
    DatePipe,
    EnumToStringPipe,
    DropdownDirective,
    SpinnerComponent,
    ButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './tasks-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent{
  readonly location = inject(LocationStrategy);
  readonly router = inject(Router);
  readonly dataService = inject(DataService) as InventoryService;

  constructor() {
    effect( () =>{
      this.location.replaceState(null, '','/inventory',`pageNumber=${this.dataService.activePage()}&pageSize=${this.headerInfo().PageSize}`);
    } )
  }



  headerInfo =this.dataService.header
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1)
  );

  protected NavigateTo(s: string) {
    this.router.navigate([s]);
  }

  protected DeleteTask(id: number) {
    this.dataService.deleteItem(id);
  }

  protected ViewTask(id: number, taskType: number) {
    taskType == 1 ? this.router.navigate([`/inventory/view_task/procurement/${id}`]) : this.router.navigate([`/inventory/view_task/transfer/${id}`]);
  }

  protected readonly TaskTypes = TaskTypes;
  protected readonly TaskTypesStatus = TaskTypesStatus;
}
