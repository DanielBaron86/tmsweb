import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { RegistersServices } from '../../../services/stores/registers-services';
import GenericDataService from '../../../services/data-service';
import { DatePipe } from '@angular/common';
import { SessionStatusEnum, TaskTypesStatus, UserTypeEnum } from '../../../models/status-enums';
import { SessionService } from '../../../services/stores/session-service';
import { QueryBuilder } from '../../../components/shared/query-builder/query-builder';
import {
  SelectedOption,
  SelectWithSearch,
} from '../../../components/form/select-with-search/select-with-search';
import { QueryFilters } from '../../../models/query-models';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { EnumToStringPipe } from '../../../pipes/enum-to-string-pipe';
import { LabelComponent } from '../../../components/form/label/label-component';
import { UserService } from '../../../services/users/user-service';
import { CreateSessionModel } from '../../../models/stores-models';
import { DropdownDirective } from '../../../directives/dropdown-directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-register-component',
  imports: [
    DatePipe,
    QueryBuilder,
    SpinnerComponent,
    ButtonComponent,
    EnumToStringPipe,
    LabelComponent,
    SelectWithSearch,
    DropdownDirective,
  ],
  providers: [{ provide: GenericDataService, useExisting: RegistersServices }],
  templateUrl: './view-register-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewRegisterComponent implements OnInit {
  ngOnInit(): void {
    this.sessionService.search(this.sessionQueryFilters());
  }
  readonly dataService = inject(GenericDataService) as RegistersServices;
  readonly sessionService = inject(SessionService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);
  protected readonly SessionStatus = SessionStatusEnum;
  disabled = signal(false);
  headerInfo = this.dataService.header;
  registerEntity = this.dataService.selectedRegister;
  createSessionModel = linkedSignal({
    source: () => this.registerEntity,
    computation: () => {
      const sessionModel: CreateSessionModel = {
        assignedClerk: 0,
        cashRegisterId: this.registerEntity()!.id,
      };
      return sessionModel;
    },
  });
  sessionQueryFilters = linkedSignal({
    source: () => this.registerEntity(),
    computation: () => {
      const cashRegisterId = this.registerEntity()?.id;
      return {
        version: 1,
        pageNumber: 1,
        pageSize: 100,
        queryFields: [
          {
            method: 'where',
            keyField: 'CashRegisterID',
            keyValue: cashRegisterId!.toString(),
          },
        ],
      };
    },
  });

  availableOptions: SelectedOption[] = [
    { value: 'id', text: 'Id' },
    { value: 'sessionStatus', text: 'Session Status' },
    { value: 'assignedClerk', text: 'Assigned Clerk Id' },
  ];
  clerkOptions: SelectedOption[] = [
    { value: 'username', text: 'username' },
    { value: 'email', text: 'email' },
    { value: 'firstName', text: 'firstName' },
    { value: 'lastName', text: 'lastName' },
  ];
  selectClerkOptions = computed<SelectedOption[]>(() => {
    const options: SelectedOption[] = [];
    const users = this.userService.usersResources;
    if (users.hasValue() && !users.isLoading()) {
      users.value()?.forEach((option) => {
        options.push({ value: option.id.toString(), text: option.username });
      });
    }

    return options;
  });
  protected readonly TaskTypesStatus = TaskTypesStatus;

  protected ReceiveFilters($event: QueryFilters) {
    // TODO document why this method 'ReceiveFilters' is empty
  }

  protected readonly UserTypeEnum = UserTypeEnum;

  protected RefreshList() {
    // TODO document why this method 'RefreshList' is empty
  }

  protected Export() {
    // TODO document why this method 'Export' is empty
  }

  protected CreateSession() {
    this.disabled.set(true);
  }

  protected onSearchInput($event: Event) {}

  protected ViewSession(id: number) {
    this.sessionService.selectSessiondId.set(id);
    this.router.navigate([`/stores/view_session`]);
  }

  protected SaveSession() {
    this.dataService.CreateSession(this.createSessionModel()).subscribe(() => {
      this.increaseVersion();
      this.sessionService.search(this.sessionQueryFilters());
      this.disabled.set(false);
    });
  }

  protected ReceiveClerkFilters($event: QueryFilters) {
    this.userService.search($event);
  }

  protected ReceiveClerk($event: any) {
    this.createSessionModel.update((val) => ({
      ...val,
      assignedClerk: Number.parseInt($event.value),
    }));
  }

  protected CancelSessionCreation() {
    this.disabled.set(false);
  }

  protected readonly SessionStatusEnum = SessionStatusEnum;

  protected CloseSession(id: number) {
    this.sessionService.CloseSession(id).subscribe(() => {
      this.increaseVersion();
      this.sessionService.search(this.sessionQueryFilters());
    });
  }

  private increaseVersion() {
    this.sessionQueryFilters.update((value) => ({
      ...value,
      version: value.version + 1,
    }));
  }
}
