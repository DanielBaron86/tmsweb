import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RegistersServices } from '../../../services/stores/registers-services';
import DataService from '../../../services/data-service';
import { DatePipe } from '@angular/common';
import { TaskTypesStatus } from '../../../models/status-enums';
import { SessionService } from '../../../services/stores/session-service';

@Component({
  selector: 'app-view-register-component',
  imports: [DatePipe],
  templateUrl: './view-register-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewRegisterComponent implements OnInit {
  ngOnInit(): void {
    this.sessionService.search(this.sessionQueryFilters());
  }
  readonly dataService = inject(DataService) as RegistersServices;
  readonly sessionService = inject(SessionService);
  headerInfo = this.dataService.header;
  registerEntity = this.dataService.selectedRegister;
  sessionQueryFilters = computed(() => {
    const cashRegisterId = this.registerEntity()?.id;
    return {
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
  });

  protected readonly TaskTypesStatus = TaskTypesStatus;
}
