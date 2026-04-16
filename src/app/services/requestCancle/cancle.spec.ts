import { TestBed } from '@angular/core/testing';

import { Cancle } from './cancle';

describe('Cancle', () => {
  let service: Cancle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cancle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
