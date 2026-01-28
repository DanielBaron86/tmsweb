import { TestBed } from '@angular/core/testing';

import GoodsTypesService from '././goods-types-service';

describe('GoodsTypesService', () => {
  let service: GoodsTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
