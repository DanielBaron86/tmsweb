import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementAddComponent } from './procurement-add-component';

describe('ProcurementAddComponent', () => {
  let component: ProcurementAddComponent;
  let fixture: ComponentFixture<ProcurementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementAddComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
