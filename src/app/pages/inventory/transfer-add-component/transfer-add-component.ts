import {ChangeDetectionStrategy, Component, computed, inject, linkedSignal, OnInit, signal} from '@angular/core';
import {AuthServices} from '../../../services/auth/auth.services';
import {SelectedOption, SelectWithSearch} from '../../../components/form/select-with-search/select-with-search';
import {LocationService} from '../../../services/location/location-service';
import {QueryFilters} from '../../../models/query-models';
import {QueryBuilder} from '../../../components/shared/query-builder/query-builder';
import {GoodsInstanceSearch} from '../../../components/shared/goods-instance-search/goods-instance-search';
import {PaginationHeader} from '../../../models/base-model';
import {LocationUnitModel} from '../../../models/location-models';

@Component({
  selector: 'app-transfer-add-component',
  imports: [
    SelectWithSearch,
    QueryBuilder,
    GoodsInstanceSearch,
  ],
  templateUrl: './transfer-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferAddComponent {
  readonly auth = inject(AuthServices)
  readonly locationService = inject(LocationService)
  readonly userProfile = this.auth.userProfile();

  queryFilters =signal<QueryFilters>(
    {
      pageNumber: 1,
      pageSize: 100,
      queryFields: []
    }
  )
  locationOptions = this.locationService.getLocationsWithFilters(this.queryFilters)
  header = computed<PaginationHeader>(
    () => this.locationOptions.hasValue() ? JSON.parse(this.locationOptions.headers()?.get('X-Pagination') ?? '{}'): {}
  )


  displayItems = linkedSignal({
    source: () => this.locationOptions.value(),
    computation : () => {
      const pagedData = this.locationOptions.value() as LocationUnitModel[];
      console.log(pagedData)
      if (pagedData) {
        return pagedData;
      }
      return this.locationOptions.value() ?? [];
    }
  });

  options = computed<SelectedOption[]>( ()=> {
    const options: SelectedOption[] = [];
    this.displayItems().forEach((item) => {
      options.push({value: item.id.toString(), text: item.description})
    })
    return options
  })

locationOption =signal<SelectedOption>({"value":"0",  "text":''})
  protected ReceiveLocation($event: any) {
    this.locationOption.update( val =>$event);
  }

  availableOptions :SelectedOption[] =[
    {value: 'Address', text: 'Address'},
    {value: 'Description', text: 'Description'}
  ]

  protected ReceiveFilters($event: any) {
   this.queryFilters.update(val => $event);
  }
}
