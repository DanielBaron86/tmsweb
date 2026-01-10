import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle-two',
  imports: [],
  templateUrl: './theme-toggle-two-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleTwoComponent {
  toggleTheme() {
   
  }
}
