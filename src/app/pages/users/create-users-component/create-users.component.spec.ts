import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersComponent } from './create-users.component';

describe('EditUsersComponent', () => {
  let component: CreateUsersComponent;
  let fixture: ComponentFixture<CreateUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUsersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
