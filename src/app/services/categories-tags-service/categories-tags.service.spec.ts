import { TestBed } from '@angular/core/testing';

import { CategoriesTagsService } from './categories-tags.service';

describe('CategoriesTagsService', () => {
  let service: CategoriesTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
