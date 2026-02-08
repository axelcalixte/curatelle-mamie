import { TestBed } from '@angular/core/testing';

import { BankAdapters } from './bank-adapters';

describe('BankAdapters', () => {
  let service: BankAdapters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAdapters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
