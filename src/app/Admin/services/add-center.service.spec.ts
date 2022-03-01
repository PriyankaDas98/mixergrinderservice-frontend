import { TestBed } from '@angular/core/testing';

import { AddCenterService } from './add-center.service';

describe('AddCenterService', () => {
  let service: AddCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
