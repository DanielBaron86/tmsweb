import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskTransfer } from './view-task-transfer';

describe('ViewTaskTransfer', () => {
  let component: ViewTaskTransfer;
  let fixture: ComponentFixture<ViewTaskTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskTransfer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskTransfer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
