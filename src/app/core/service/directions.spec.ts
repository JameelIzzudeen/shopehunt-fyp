import { TestBed } from '@angular/core/testing';

import { Directions } from './directions';

describe('Directions', () => {
  let service: Directions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Directions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
