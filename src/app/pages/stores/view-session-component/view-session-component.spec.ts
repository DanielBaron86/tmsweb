import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSessionComponent } from './view-session-component';

describe('ViewSessionComponent', () => {
  let component: ViewSessionComponent;
  let fixture: ComponentFixture<ViewSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSessionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
