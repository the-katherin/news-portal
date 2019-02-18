import { TestBed } from '@angular/core/testing';

import { MyArticlesService } from './my-articles.service';

describe('MyArticlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyArticlesService = TestBed.get(MyArticlesService);
    expect(service).toBeTruthy();
  });
});
