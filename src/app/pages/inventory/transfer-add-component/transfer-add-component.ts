import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {AuthServices} from '../../../services/auth/auth.services';
import {SelectedOption, SelectWithSearch} from '../../../components/form/select-with-search/select-with-search';
import {LocationService} from '../../../services/location/location-service';
import {QueryFilters} from '../../../models/query-models';
import {QueryBuilder} from '../../../components/shared/query-builder/query-builder';

@Component({
  selector: 'app-transfer-add-component',
  imports: [
    SelectWithSearch,
    QueryBuilder,
  ],
  templateUrl: './transfer-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferAddComponent {
queryFilter: QueryFilters={
    pageNumber: 1,
    pageSize: 100,
}
  readonly auth = inject(AuthServices)
  readonly locationService = inject(LocationService)
  readonly userProfile = this.auth.userProfile();
  locationOptions = this.locationService.getLocationsWithFilters(this.queryFilter)
  options = computed<SelectedOption[]>( ()=> {
    const options: SelectedOption[] = [];
    this.locationOptions.displayItems().forEach((item) => {
      options.push({value: item.id.toString(), text: item.description})
    })
    return options
  })

locationOption =signal<SelectedOption>({"value":"0",  "text":''})
  protected ReceiveLocation($event: any) {
    this.locationOption.update( val =>$event);
      console.log($event)
  }


  protected ReceiveFilters($event: any) {
    this.locationService.queryFilters.set($event)
  }
}
