import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { PaginationComponent } from '../../../components/shared/pagination-component/pagination-component';
import { QueryBuilder } from '../../../components/shared/query-builder/query-builder';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import DataService from '../../../services/data-service';
import { Router } from '@angular/router';
import { SelectedOption } from '../../../components/form/select-with-search/select-with-search';
import { QueryFilters } from '../../../models/query-models';
import { UserTypeEnum } from '../../../models/status-enums';
import { ClientService } from '../../../services/clients/client-service';

@Component({
  selector: 'app-clients-component',
  imports: [
    ButtonComponent,
    DatePipe,
    EnumToStringPipe,
    PaginationComponent,
    QueryBuilder,
    SpinnerComponent,
  ],
  templateUrl: './clients-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  readonly dataService = inject(DataService) as ClientService;
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

  protected Export() {
    // TODO document why this method 'Export' is empty
  }

  protected readonly UserTypeEnum = UserTypeEnum;

  protected onSearchInput($event: Event) {
    /* empty */
  }
  protected EditClientAccount(id: number) {
    this.router.navigate([`/clients/profile/${id}`]);
  }

  protected CreateClientAccount() {
    this.router.navigate([`/clients/new`]);
  }
}
