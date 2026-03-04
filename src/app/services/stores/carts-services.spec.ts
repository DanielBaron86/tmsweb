import { TestBed } from '@angular/core/testing';

import { CartsServices } from './carts-services';

describe('CartsServices', () => {
  let service: CartsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
