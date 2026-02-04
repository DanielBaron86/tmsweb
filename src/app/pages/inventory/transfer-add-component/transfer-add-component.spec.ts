import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAddComponent } from './transfer-add-component';

describe('TransferAddComponent', () => {
  let component: TransferAddComponent;
  let fixture: ComponentFixture<TransferAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferAddComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
