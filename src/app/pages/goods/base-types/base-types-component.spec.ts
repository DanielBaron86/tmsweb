import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTypesComponent } from './base-types-component';

describe('BaseTypesComponent', () => {
  let component: BaseTypesComponent;
  let fixture: ComponentFixture<BaseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseTypesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
