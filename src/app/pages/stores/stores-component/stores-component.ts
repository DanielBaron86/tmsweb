import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../../../components/ui/button-component/button-component';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../../components/ui/spinner-component/spinner-component';
import DataService from '../../../services/data-service';
import { RegistersServices } from '../../../services/stores/registers-services';
import { CashRegisterModel, CreateCashRegisterModel } from '../../../models/stores-models';
import { DropdownDirective } from '../../../directives/dropdown-directive';
import { TaskTypesStatus } from '../../../models/status-enums';
import { form, FormField, min, required } from '@angular/forms/signals';
import { LabelComponent } from '../../../components/form/label/label-component';
import {
  SelectedOption,
  SelectWithSearch,
} from '../../../components/form/select-with-search/select-with-search';
import { QueryBuilder } from '../../../components/shared/query-builder/query-builder';
import { QueryFields, QueryFilters } from '../../../models/query-models';
import { LocationService } from '../../../services/location/location-service';
import { LocationUnitModel } from '../../../models/location-models';

@Component({
  selector: 'app-stores-component',
  imports: [
    ButtonComponent,
    DatePipe,
    SpinnerComponent,
    DropdownDirective,
    FormField,
    LabelComponent,
    QueryBuilder,
    SelectWithSearch,
  ],
  templateUrl: './stores-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresComponent implements OnInit {
  ngOnInit(): void {
    this.locationService.search(this.locationQuery);
  }
  readonly dataService = inject(DataService) as RegistersServices;
  readonly headerInfo = this.dataService.header;
  readonly locationService = inject(LocationService);
  locationQuery: QueryFilters = {
    pageNumber: 1,
    pageSize: 10,
    queryFields: [
      {
        keyField: 'locationTypeId',
        keyValue: '2',
        method: 'where',
      },
    ],
  };

  displayLocations = linkedSignal({
    source: () => this.locationService.locationsTypesResource.value(),
    computation: () => {
      const pagedData = this.locationService.locationsTypesResource.value() as LocationUnitModel[];
      if (pagedData) {
        return pagedData;
      }
      return this.locationService.locationsTypesResource.value() ?? [];
    },
  });

  selectOptions = computed<SelectedOption[]>(() => {
    const options: SelectedOption[] = [];
    this.displayLocations().forEach((item) => {
      options.push({ value: item.id.toString(), text: item.description });
    });
    return options;
  });
  disabled = signal<boolean>(false);
  emptyModel = {
    registerNumber: 0,
    locationId: 0,
    notes: [],
  };
  createCashRegisterModel = signal<CreateCashRegisterModel>(this.emptyModel);
  notesList = signal<string[]>(['']);
  addNote = () => {
    this.notesList.update((prev) => [...prev, '']);
  };
  removeNote = (index: number) => {
    this.notesList.update((prev) => prev.filter((_, i) => i !== index));
    this.syncNotesToModel();
  };
  updateNote(index: number, value: string) {
    this.notesList.update((notes) => {
      const updated = [...notes];
      updated[index] = value;
      return updated;
    });
    this.syncNotesToModel();
  }
  private syncNotesToModel() {
    const filtered = this.notesList().filter((n) => n.trim() !== '');
    this.createCashRegisterModel.update((m) => ({ ...m, notes: filtered }));
  }
  createCashRegister = form(this.createCashRegisterModel, (modelPatch) => {
    required(modelPatch.registerNumber);
    required(modelPatch.locationId);
    min(modelPatch.registerNumber, 1);
    min(modelPatch.locationId, 1);
  });
  availableOptions: SelectedOption[] = [
    { value: 'Address', text: 'Address' },
    { value: 'Description', text: 'Description' },
  ];
  locationOption = signal<SelectedOption[]>([]);
  protected RefreshList() {
    // TODO document why this method 'RefreshList' is empty
  }

  protected Export() {
    // TODO document why this method 'Export' is empty
  }

  protected NewRegister() {
    this.resetForm();
    this.disabled.set(true);
  }
  protected CancelRegisterCreation() {
    this.resetForm();
    this.disabled.set(false);
  }

  resetForm() {
    this.createCashRegister().reset();
    this.createCashRegisterModel.set(this.emptyModel);
  }

  protected onSearchInput($event: Event) {
    /* empty */
  }

  protected EditRegister(registerItem: CashRegisterModel) {
    console.log(registerItem);
    this.createCashRegisterModel.update((item) => ({
      ...item,
      registerNumber: registerItem.registerNumber,
      locationId: registerItem.locationId,
      notes: registerItem.notes,
    }));
    this.notesList.set(registerItem.notes);
    this.disabled.set(true);
  }

  protected readonly TaskTypesStatus = TaskTypesStatus;

  protected ViewRegister(id: number) {
    // TODO document why this method 'ViewRegister' is empty
  }

  protected SaveRegister() {
    this.syncNotesToModel();
    console.log(this.createCashRegisterModel());
    this.dataService.CreateRegister(this.createCashRegisterModel()).subscribe(() => {
      this.dataService.refresh();
      this.disabled.set(false);
    });
  }

  protected ReceiveFilters($event: QueryFilters) {
    const staticFilter: QueryFields = {
      keyField: 'locationTypeId',
      keyValue: '2',
      method: 'where',
    };
    $event.queryFields = [...($event.queryFields ?? []), staticFilter];
    this.locationService.search($event);
  }

  protected ReceiveLocation($event: any) {
    this.createCashRegisterModel.update((m) => ({ ...m, locationId: $event.value }));
  }
}
