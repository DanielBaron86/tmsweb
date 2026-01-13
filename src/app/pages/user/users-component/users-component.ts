import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { MainPage } from '../../../components/main-page/main-page';


@Component({
  selector: 'app-users-component',
  imports: [RouterModule,MainPage],
  templateUrl: './users-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {

}
