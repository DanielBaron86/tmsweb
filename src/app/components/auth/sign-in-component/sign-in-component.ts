import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthPageLayoutComponent } from '../auth-page-layout-component/auth-page-layout-component';
import { SigninFormComponent } from '../signin-form/signin-form.component';

@Component({
  selector: 'app-sign-in-component',
  imports: [AuthPageLayoutComponent,SigninFormComponent],
  templateUrl: './sign-in-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  userToken = 'example-token-12345';
}
