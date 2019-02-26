import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleComponent } from './edit-article.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TitleService} from "../../services/title.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

import articleStub from '../../mocks/articleMock';
import {NewsService} from "../../services/news.service";

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;
  const titleServiceSpy = jasmine.createSpyObj('TitleService', ['onChangeTitle']);
  const newsServiceMock = { articles: [articleStub]};


    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
        ],
      declarations: [ EditArticleComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
            { provide: TitleService, useValue: titleServiceSpy },
            { provide: NewsService, useValue: newsServiceMock },
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and call title service changeTitle with `edit-article` title', () => {
    expect(component).toBeTruthy();
    expect(titleServiceSpy.onChangeTitle).toHaveBeenCalledWith('Edit Article');
  });
});
