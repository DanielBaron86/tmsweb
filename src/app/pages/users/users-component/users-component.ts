import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import DataService from '../../../services/data-service';
import {UserService} from '../../../services/users/user-service';
import {QueryBuilder} from '../../../components/shared/query-builder/query-builder';
import {QueryFilters} from '../../../models/query-models';
import {SelectedOption} from '../../../components/form/select-with-search/select-with-search';
import {SpinnerComponent} from '../../../components/ui/spinner-component/spinner-component';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {DatePipe} from '@angular/common';
import {UserResource} from '../../../models/user-models';
import {EnumToStringPipe} from '../../../pipes/enum-to-string-pipe';
import {UserTypeEnum} from '../../../models/status-enums';

@Component({
  selector: 'app-users-component',
  imports: [
    QueryBuilder,
    SpinnerComponent,
    ButtonComponent,
    DatePipe,
    EnumToStringPipe
  ],
  templateUrl: './users-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  readonly dataService = inject(DataService) as UserService;
  queryTitle = input<string>('Users Query Filters');
  availableOptions :SelectedOption[] =[
    {value: 'id', text: 'Id'},
    {value: 'email', text: 'Email'},
    {value: 'firstName', text: 'First Name'},
    {value: 'lastName', text: 'Last Name'},
    {value: 'userTypeId', text: 'User Type'},
    {value: 'username', text: 'Username'},
  ]
  disabled = signal<boolean>(false);
  protected ReceiveFilters($event: QueryFilters) {
    this.dataService.search($event);
  }

  protected RefreshList() {

  }

  protected Export() {

  }

  protected NewUser() {

  }

  protected onSearchInput($event: Event) {

  }

  protected EditUser(userItem: UserResource) {

  }

  protected readonly UserTypeEnum = UserTypeEnum;
}
