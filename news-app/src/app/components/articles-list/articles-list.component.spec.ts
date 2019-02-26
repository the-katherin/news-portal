import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFilterPipe } from '../../pipes/articles-filter.pipe';

import { ArticlesListComponent } from './articles-list.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ArticlesListComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ ArticlesListComponent, ArticlesFilterPipe ],
        schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
