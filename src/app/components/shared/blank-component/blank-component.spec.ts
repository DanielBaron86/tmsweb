import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankComponent } from './blank-component';

describe('BlankComponent', () => {
  let component: BlankComponent;
  let fixture: ComponentFixture<BlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
