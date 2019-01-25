import { TestBed } from '@angular/core/testing';

import { Dota2apiService } from './dota2api.service';

describe('Dota2apiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Dota2apiService = TestBed.get(Dota2apiService);
    expect(service).toBeTruthy();
  });
});
