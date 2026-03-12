import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import GenericDataService from '../../../services/data-service';
import { UserService } from '../../../services/users/user-service';
import { EditUser } from '../../../models/user-models';
import { email, form, FormField, required, validate } from '@angular/forms/signals';
import { LabelComponent } from '../../../components/form/label/label-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [LabelComponent, FormField],
  templateUrl: './profile-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly dataService = inject(GenericDataService) as UserService;
  readonly router = inject(Router);
  userid = input<number>(0);
  readonly userResource = this.dataService.getUserById(() => this.userid());

  userModel = linkedSignal({
    source: () => ({
      userid: this.userid(),
      user: this.userResource.value(),
      isLoading: this.userResource.isLoading(),
    }),
    computation: (source): EditUser => {
      const empty: EditUser = {
        email: '',
        firstName: '',
        lastName: '',
        userTypeId: '0',
      };
      if (source.userid === 0 || source.isLoading || !source.user) {
        return empty;
      }
      return {
        ...empty,
        email: source.user.email ?? '',
        firstName: source.user.firstName ?? '',
        lastName: source.user.lastName ?? '',
        userTypeId: source.user.userTypeId.toString() ?? '0',
      };
    },
  });

  createForm = form(this.userModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    validate(schemaPath.email, ({ value }) => {
      const emailValue = value();
      if (!emailValue.includes('@')) {
        return { kind: 'invalid', message: 'Email must contain @' };
      }
      return null;
    });
    required(schemaPath.firstName, { message: 'First name is required' });
    required(schemaPath.lastName, { message: 'Last name is required' });
    required(schemaPath.userTypeId, { message: 'User type is required' });
  });

  protected onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    console.log(this.userModel());
    if (this.createForm().invalid()) {
      this.createForm().markAsTouched();
      return;
    }
    this.dataService
      .updateUser(this.userModel(), this.userid())
      .subscribe(() => this.userResource.reload());
  }

  protected CancelForm() {
    this.router.navigate(['/users']);
  }
}
