import { TestBed } from '@angular/core/testing';

import { SolaService } from './sola.service';

describe('SolaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolaService = TestBed.get(SolaService);
    expect(service).toBeTruthy();
  });
});
