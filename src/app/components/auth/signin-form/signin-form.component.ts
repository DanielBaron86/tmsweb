import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthServices } from '../../../services/auth/auth.services';
import { LabelComponent } from '../../form/label/label-component';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../../models/user-models';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'app-signin-form',
  imports: [LabelComponent, FormsModule, FormField],
  templateUrl: './signin-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {
  readonly authService = inject(AuthServices);
  loginModel = signal<LoginModel>({
    email: '',
    password: '',
    rememberMe: false,
  });
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email);
    required(schemaPath.password);
  });

  inputValueEmail = '';
  inputValuePassword = '';

  showPassword = false;
  isChecked = true;

  inputType = signal('password');

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType.set('text');
    } else {
      this.inputType.set('password');
    }
  }
  onKeepMeLoggedIn($event: boolean) {
    this.isChecked = $event;
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      console.log('Refreshing token from storage', storedToken);
      /// Implement TOKEN REFRESH LOGIC  AND API ENDPOINT HERE
    } else {
      console.log('No token found in storage');
    }
  }

  protected onSignIn($event: SubmitEvent) {
    $event.preventDefault();
    this.authService.login(this.loginForm().value());
  }
}
