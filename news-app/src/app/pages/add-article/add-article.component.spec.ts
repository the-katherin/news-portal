import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleComponent } from './add-article.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {NewsService} from "../../services/news.service";
import {TitleService} from "../../services/title.service";
import {FilterService} from "../../services/filter.service";

describe('AddArticleComponent', () => {
  let component: AddArticleComponent;
  let fixture: ComponentFixture<AddArticleComponent>;
  let titleServiceSpy = jasmine.createSpyObj('TitleService', ['onChangeTitle']);

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AddArticleComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [
            { provide: TitleService, useValue: titleServiceSpy },
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and call title service changeTitle with `add-article` title', () => {
    expect(component).toBeTruthy();
    expect(titleServiceSpy.onChangeTitle).toHaveBeenCalledWith('add article');
  });
});
