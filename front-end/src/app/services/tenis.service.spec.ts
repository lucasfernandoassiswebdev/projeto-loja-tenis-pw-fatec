import { TestBed } from '@angular/core/testing';

import { TenisService } from './tenis.service';

describe('TenisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenisService = TestBed.get(TenisService);
    expect(service).toBeTruthy();
  });
});
