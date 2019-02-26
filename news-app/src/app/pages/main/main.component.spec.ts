import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import articleStub from "../../mocks/articleMock";
import {ApiService} from "../../services/api.service";
import {NewsService} from "../../services/news.service";
import {TitleService} from "../../services/title.service";
import {FilterService} from "../../services/filter.service";
import {of} from "rxjs";

fdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
//  const newsServiceSpy = jasmine.createSpyObj('NewsService', ['onChangeChannel', 'switchChannel', 'switchChannel.subscribe']);
  let filterServiceSpy = jasmine.createSpyObj('FilterService', ['onChangeKeyword', 'onShowOnlyMyArticlesChange']);

    const newsServiceMock = {
        articles: [articleStub],
        switchChannel: {subscribe: () => {}},
    };

    // newsServiceSpy.articles = [articleStub];
    //
    // newsServiceSpy.switchChannel.subscribe.and.returnValue(of(() => {}));

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
        ],
        declarations: [ MainComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [
            // { provide: ApiService, useValue: apiServiceSpy },
            { provide: NewsService, useValue: newsServiceMock },
            // { provide: TitleService, useValue: titleServiceSpy },
            // { provide: FilterService, useValue: filterServiceSpy },
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and set max visible items to 4', () => {
    expect(component).toBeTruthy();
    expect(component.maxVisibleItems).toBe(4);

  });
});
