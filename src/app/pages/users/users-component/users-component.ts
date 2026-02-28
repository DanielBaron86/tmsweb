import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import DataService from '../../../services/data-service';
import { UserService } from '../../../services/users/user-service';
import { QueryBuilder } from '../../../components/shared/query-builder/query-builder';
import { QueryFilters } from '../../../models/query-models';
import { SelectedOption } from '../../../components/form/select-with-search/select-with-search';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { UserTypeEnum } from '../../../models/status-enums';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';

@Component({
  selector: 'app-users-component',
  imports: [
    QueryBuilder,
    SpinnerComponent,
    ButtonComponent,
    DatePipe,
    EnumToStringPipe,
    PaginationComponent,
  ],
  templateUrl: './users-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  readonly dataService = inject(DataService) as UserService;
  readonly router = inject(Router);
  headerInfo = this.dataService.header;
  queryTitle = input<string>('Users Query Filters');
  availableOptions: SelectedOption[] = [
    { value: 'id', text: 'Id' },
    { value: 'email', text: 'Email' },
    { value: 'firstName', text: 'First Name' },
    { value: 'lastName', text: 'Last Name' },
    { value: 'userTypeId', text: 'User Type' },
    { value: 'username', text: 'Username' },
  ];
  disabled = signal<boolean>(false);
  pageNumbers = computed(() =>
    Array.from({ length: this.headerInfo().TotalPageCount }, (_, i) => i + 1),
  );
  protected ReceiveFilters($event: QueryFilters) {
    this.dataService.search($event);
  }

  protected RefreshList() {
    this.dataService.refresh();
  }

  protected Export() {}

  protected onSearchInput($event: Event) {}

  protected readonly UserTypeEnum = UserTypeEnum;

  protected EditUser(id: number) {
    this.router.navigate([`/users/${id}`]);
  }
}
