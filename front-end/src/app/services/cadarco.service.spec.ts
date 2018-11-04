import { TestBed } from '@angular/core/testing';

import { CadarcoService } from './cadarco.service';

describe('CadarcoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadarcoService = TestBed.get(CadarcoService);
    expect(service).toBeTruthy();
  });
});
