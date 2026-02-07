import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsComponent } from './carts-component';

describe('CartsComponent', () => {
  let component: CartsComponent;
  let fixture: ComponentFixture<CartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
