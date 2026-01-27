import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthServices} from './services/auth/auth.services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tmsweb');
  auth = inject(AuthServices)

}
