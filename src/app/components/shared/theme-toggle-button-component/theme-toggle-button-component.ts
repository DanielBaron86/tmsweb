import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle-button',
  imports: [],
  templateUrl: './theme-toggle-button-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleButtonComponent {
theme = 'dark';

  toggleTheme() {
    throw new Error('Method not implemented.');
  }

}
