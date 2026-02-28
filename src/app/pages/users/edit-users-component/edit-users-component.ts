import {ChangeDetectionStrategy, Component, inject, input, linkedSignal} from '@angular/core';
import {CreateUser} from '../../../models/user-models';
import DataService from '../../../services/data-service';
import {UserService} from '../../../services/users/user-service';
import {LabelComponent} from '../../../components/form/label/label-component';
import {InputFieldComponent} from '../../../components/form/input/input-field-component/input-field-component';
import {ButtonComponent} from '../../../components/ui/button-component/button-component';
import {SelectComponent} from '../../../components/form/select-component/select-component';
import {form, FormField} from '@angular/forms/signals';
@Component({
  selector: 'app-edit-users-component',
  imports: [
    LabelComponent,
    InputFieldComponent,
    ButtonComponent,
    SelectComponent,
    FormField
  ],
  templateUrl: './edit-users-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUsersComponent {

  readonly dataService = inject(DataService) as UserService;

  userid = input<number>(0);
  readonly userResource = this.dataService.getUserById(() => this.userid());

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
        userTypeId: 0,
        password: '',
        confirmPassword: ''
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
        userTypeId: source.user.userTypeId ?? 0,
      };
    }
  })
  createForm = form(this.userModel)
  options = [
    { value: '3', label: 'Clerk' },
    { value: '4', label: 'Supervisor' },
  ];
}
