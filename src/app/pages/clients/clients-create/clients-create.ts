import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import DataService from '../../../services/data-service';
import { ClientService } from '../../../services/clients/client-service';
import { LabelComponent } from '../../../components/form/label/label-component';
import { Router } from '@angular/router';
import { CreateUser } from '../../../models/user-models';
import {
  email,
  form,
  FormField,
  maxLength,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';

@Component({
  selector: 'app-clients-create',
  imports: [LabelComponent, FormField],
  templateUrl: './clients-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsCreate {
  readonly dataService = inject(DataService) as ClientService;
  readonly router = inject(Router);

  userModel = signal<CreateUser>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    userTypeId: '2',
    password: '',
    confirmPassword: '',
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
  protected onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    console.log(this.userModel());
    if (this.createForm().invalid()) {
      this.createForm().markAsTouched();
      return;
    }
    this.dataService.createUser(this.userModel()).subscribe(() => {
      this.router.navigate(['/clients']);
    });
  }

  protected CancelForm() {
    this.router.navigate(['/clients']);
  }
}
