import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject, Injector,
  input,
  linkedSignal,
  OnInit,
  Signal, WritableSignal
} from '@angular/core';
import {ProcurementsModel} from '../../../models/tasks-models';
import {DatePipe} from '@angular/common';
import {TaskTypesStatus, UserTypeEnum} from '../../../models/status-enums';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {UserService} from '../../../services/users/user-service';
import {HttpResourceRef} from '@angular/common/http';
import {UserResource} from '../../../models/user-models';
import {InventoryService} from '../../../services/inventory/inventory.service';
import DataService from '../../../services/data-service';

@Component({
  selector: 'app-view-task-procurement',
  imports: [
    DatePipe,
    EnumToStringPipe
  ],
  templateUrl: './view-task-procurement.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaskProcurement implements OnInit {

   userProfile: HttpResourceRef<UserResource | undefined> | undefined;
  ngOnInit(): void {
    this.userProfile = this.userService.getUserById(this.task().creatorId)

  }

  id = input.required<number>();
  task = input.required<ProcurementsModel>();

  dataService = inject(DataService) as InventoryService;
  userService = inject(UserService)
  injector = inject(Injector)













  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;
}
