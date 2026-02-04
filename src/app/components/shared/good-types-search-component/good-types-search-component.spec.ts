import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodTypesSearchComponent } from './good-types-search-component';

describe('GoodTypesSearchComponent', () => {
  let component: GoodTypesSearchComponent;
  let fixture: ComponentFixture<GoodTypesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodTypesSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodTypesSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
