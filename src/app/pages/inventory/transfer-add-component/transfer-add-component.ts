import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {AuthServices} from '../../../services/auth/auth.services';
import {Option, SelectWithSearch} from '../../../components/form/select-with-search/select-with-search';
import {LocationSearchComponent} from '../../../components/shared/location-search-component/location-search-component';
import {LocationService} from '../../../services/location/location-service';
import {QueryFilters} from '../../../models/query-models';

@Component({
  selector: 'app-transfer-add-component',
  imports: [
    SelectWithSearch
  ],
  templateUrl: './transfer-add-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferAddComponent implements OnInit {
  ngOnInit(): void {
      console.log(this.locationOptions.displayItems())
  }

queryFilter: QueryFilters={
    pageNumber: 1,
    pageSize: 100,
   queryFields : [
     {keyField: 'Address', keyValue: "Suceava"},
     {keyField: 'Description', keyValue: "item"}
   ]
}
  readonly auth = inject(AuthServices)
  readonly locationService = inject(LocationService)
  readonly userProfile = this.auth.userProfile();
  locationOptions = this.locationService.getLocationsWithFilters(this.queryFilter)
  options = computed<Option[]>( ()=> {
    const options: Option[] = [];
    this.locationOptions.displayItems().forEach((item) => {
      options.push({value: item.id.toString(), text: item.description})
    })
    return options
  })


  protected ReceiveLocation($event: any) {
      console.log($event)
  }
}
