import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import { CreateUser } from '../../../models/user-models';
import DataService from '../../../services/data-service';
import { UserService } from '../../../services/users/user-service';
import { LabelComponent } from '../../../components/form/label/label-component';
import {
  email,
  form,
  FormField,
  maxLength,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-users-component',
  imports: [LabelComponent, FormField],
  templateUrl: './edit-users-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUsersComponent {
  readonly dataService = inject(DataService) as UserService;
  readonly router = inject(Router);

  userid = input<number>(0);
  readonly userResource = this.dataService.getUserById(() => this.userid());
  responseError = input<string | null>(null);

  userModel = linkedSignal({
    source: () => ({
      userid: this.userid(),
      user: this.userResource.value(),
      isLoading: this.userResource.isLoading(),
    }),
    computation: (source): CreateUser => {
      const empty: CreateUser = {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        userTypeId: '0',
        password: '',
        confirmPassword: '',
      };
      if (source.userid === 0 || source.isLoading || !source.user) {
        return empty;
      }
      return {
        ...empty,
        username: source.user.username ?? '',
        email: source.user.email ?? '',
        firstName: source.user.firstName ?? '',
        lastName: source.user.lastName ?? '',
        userTypeId: source.user.userTypeId.toString() ?? '0',
      };
    },
  });

  createForm = form(this.userModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is required' });
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
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' });
    maxLength(schemaPath.password, 100, { message: 'Password is too long' });
    required(schemaPath.confirmPassword, { message: 'Confirm password is required' });
    validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
      const confirmation = value();
      const password = valueOf(schemaPath.password);
      if (confirmation !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  });

  options = [
    { value: '3', label: 'Clerk' },
    { value: '4', label: 'Supervisor' },
  ];

  protected onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    console.log(this.userModel());
    if (this.createForm().invalid()) {
      this.createForm().markAsTouched();
      return;
    }
    this.dataService.createUser(this.userModel()).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
