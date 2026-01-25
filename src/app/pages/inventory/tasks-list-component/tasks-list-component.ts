import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MainPage} from '../../../components/main-page/main-page';

@Component({
  selector: 'app-tasks-list-component',
  imports: [
    MainPage
  ],
  templateUrl: './tasks-list-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit{
  constructor() {
    console.log('Constructor TasksListComponent');
  }

  ngOnInit(): void {
    console.log('OnInit TasksListComponent');
  }
}
