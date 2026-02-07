import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskProcurement } from './view-task-procurement';

describe('ViewTaskProcurement', () => {
  let component: ViewTaskProcurement;
  let fixture: ComponentFixture<ViewTaskProcurement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskProcurement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskProcurement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
