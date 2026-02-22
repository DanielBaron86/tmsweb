import {
  ChangeDetectionStrategy,
  Component,
  computed, ElementRef,
  inject,
  input,
  OnInit,
  QueryList, signal,
  viewChildren
} from '@angular/core';
import {TaskServices} from '../../../services/tasks/task-services';
import {AuthServices} from '../../../services/auth/auth.services';
import {LocationService} from '../../../services/location/location-service';
import {UserService} from '../../../services/users/user-service';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {TaskTypesStatus, UserTypeEnum} from '../../../models/status-enums';
import {DatePipe} from '@angular/common';
import {FulfillGoodsTransfer, FulfilmentModel} from '../../../models/tasks-models';

@Component({
  selector: 'app-view-task-transfer',
  imports: [
    EnumToStringPipe,
    DatePipe
  ],
  templateUrl: './view-task-transfer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTaskTransfer implements OnInit{
  readonly auth = inject(AuthServices)
  readonly userService = inject(UserService)
  readonly taskService = inject(TaskServices)
  protected readonly TaskTypesStatus = TaskTypesStatus;
  protected readonly UserTypeEnum = UserTypeEnum;
  readonly itemList = viewChildren<ElementRef<HTMLInputElement>>('itemList')

  basicTask =computed( () => {
    const profile = this.auth.userProfile();
    return {
      userId: profile.id,
      fulfillGoodsTransfer: []
    } as FulfillGoodsTransfer
  })
  selectedItems = signal<string[]>([])

  itemsToCreate = computed(() => {
    const task = this.basicTask();
    const selected = this.selectedItems();
    return {...task, fulfillGoodsTransfer: selected}

  });


  ngOnInit(): void {
    console.log(this.receivedTask.value())
    }

  id = input.required<number>()
  receivedTask = this.taskService.getTransferTaskByIdWithFactory( ()=> this.id())

  /**
   @summary Get task creator profile to display creator name in the form
   **/
  userProfile = this.userService.getUserById(() => {
    const task = this.receivedTask.value();
    return task ? task.creatorId : undefined;
  });
  // @ts-ignore
  total = computed(() => {
    const task = this.receivedTask.value();
    return task ? task.tasksEntitiesTransferList.length : 0;
  })

  SaveList() {
    this.itemList().forEach( (item)  => {
      if (item.nativeElement.checked)
        this.selectedItems.update(list => [...list, item.nativeElement.value])
    })
    this.taskService.fulfillTransferTask(this.id(),this.itemsToCreate()).subscribe( (data) => {
      console.log(data)
      this.itemList().forEach( (item)  => { item.nativeElement.checked = false})
      this.receivedTask.reload()
    }
    )


  }

}
