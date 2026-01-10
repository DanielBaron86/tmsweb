import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageLayoutComponent } from './auth-page-layout-component';

describe('AuthPageLayoutComponent', () => {
  let component: AuthPageLayoutComponent;
  let fixture: ComponentFixture<AuthPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
