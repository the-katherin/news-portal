import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArticleViewComponent } from './single-article-view.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SingleArticleViewComponent', () => {
  let component: SingleArticleViewComponent;
  let fixture: ComponentFixture<SingleArticleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
        ],
        declarations: [ SingleArticleViewComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
