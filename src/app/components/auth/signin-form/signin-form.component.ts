import { ChangeDetectionStrategy, Component, inject, input, model, signal, viewChild, viewChildren } from '@angular/core';
import { AuthServices } from '../../../services/auth/auth.services';
import { LabelComponent } from '../../form/label/label-component';
import { InputFieldComponent } from '../../form/input/input-field-component/input-field-component';
import { CheckboxComponent } from '../../form/input/checkbox-component/checkbox-component';
import { ButtonComponent } from '../../ui/button-component/button-component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  imports: [LabelComponent,InputFieldComponent,CheckboxComponent,ButtonComponent,ButtonComponent,FormsModule],
  templateUrl: './signin-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {


readonly authService = inject(AuthServices)
 
 inputValueEmail = '';
 inputValuePassword = '';
   
 showPassword = false;
 isChecked = false;

 inputType='password';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }
  className = 'mb-4';

  

   onSignIn(): void {
   this.authService.login(this.inputValueEmail,this.inputValuePassword,this.isChecked);
  
  }

  onKeepMeLoggedIn($event:boolean){
    this.isChecked=$event;
  }
}
