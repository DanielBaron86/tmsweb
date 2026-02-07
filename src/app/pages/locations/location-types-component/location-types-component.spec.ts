import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypesComponent } from './location-types-component';

describe('LocationTypesComponent', () => {
  let component: LocationTypesComponent;
  let fixture: ComponentFixture<LocationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTypesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
