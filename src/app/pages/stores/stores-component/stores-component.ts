import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import DataService from '../../../services/data-service';
import { RegistersServices } from '../../../services/stores/registers-services';
import { CashRegisterModel } from '../../../models/stores-models';
import { DropdownDirective } from '../../../directives/dropdown-directive';
import { TaskTypesStatus } from '../../../models/status-enums';

@Component({
  selector: 'app-stores-component',
  imports: [ButtonComponent, DatePipe, SpinnerComponent, DropdownDirective],
  templateUrl: './stores-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent {
  readonly dataService = inject(DataService) as RegistersServices;
  protected RefreshList() {
    // TODO document why this method 'RefreshList' is empty
  }

  protected Export() {
    // TODO document why this method 'Export' is empty
  }

  protected NewRegister() {
    // TODO document why this method 'NewRegister' is empty
  }

  protected onSearchInput($event: Event) {
    /* empty */
  }

  protected EditRegister(registerItem: CashRegisterModel) {
    // TODO document why this method 'EditRegister' is empty
  }

  protected readonly TaskTypesStatus = TaskTypesStatus;

  protected ViewRegister(id: number) {
    // TODO document why this method 'ViewRegister' is empty
  }
}
