import { ChangeDetectionStrategy, Component, input, linkedSignal, output } from '@angular/core';
import { CreateLocationUnitModel, LocationUnitModel } from '../../../models/location-models';
import { form, FormField, required } from '@angular/forms/signals';
import { LabelComponent } from '../../form/label/label-component';

@Component({
  selector: 'app-edit-location',
  imports: [LabelComponent, FormField],
  templateUrl: './edit-location.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLocation {
  emptyLocation: CreateLocationUnitModel = {
    locationTypeId: '',
    id: 0,
    address: '',
    description: '',
  };
  inputLocation = input<LocationUnitModel | null>(null);
  outputLocation = output<CreateLocationUnitModel | null>();
  instanceLocation = linkedSignal({
    source: () => this.inputLocation(),
    computation: () => {
      if (this.inputLocation() === null) {
        return this.emptyLocation;
      }
      return {
        ...this.emptyLocation,
        id: this.inputLocation()!.id,
        address: this.inputLocation()!.address,
        description: this.inputLocation()!.description,
        locationTypeId: this.inputLocation()!.locationTypeId.toString(),
      };
    },
  });

  locationForm = form(this.instanceLocation, (schemaPath) => {
    required(schemaPath.address);
    required(schemaPath.description);
    required(schemaPath.locationTypeId);
  });

  protected onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.outputLocation.emit(this.locationForm().value());
  }

  protected CancelForm() {
    this.instanceLocation.set(this.emptyLocation);
    this.outputLocation.emit(null);
  }
}
