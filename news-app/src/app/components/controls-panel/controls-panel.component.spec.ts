import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsPanelComponent } from './controls-panel.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {NewsService} from "../../services/news.service";
import {TitleService} from "../../services/title.service";
import {ApiService} from "../../services/api.service";
import {FilterService} from "../../services/filter.service";
import {of} from "rxjs";

const stubChannels = [
    {
        id: 'abc',
        name: 'AAA',
    },

    {
        id: 'abcd',
        name: 'AAAdd',
    },
];

describe('ControlsPanelComponent', () => {
  let component: ControlsPanelComponent;
  let fixture: ComponentFixture<ControlsPanelComponent>;
  let newsServiceSpy = jasmine.createSpyObj('NewsService', ['onChangeChannel']);
  let apiServiceSpy = jasmine.createSpyObj('ApiService', ['getChannelsList']);
  let titleServiceSpy = jasmine.createSpyObj('TitleService', ['onChangeTitle']);
  let filterServiceSpy = jasmine.createSpyObj('FilterService', ['onChangeKeyword', 'onShowOnlyMyArticlesChange']);
  apiServiceSpy.getChannelsList.and.returnValue(of(stubChannels));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsPanelComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [
            { provide: ApiService, useValue: apiServiceSpy },
            { provide: NewsService, useValue: newsServiceSpy },
            { provide: TitleService, useValue: titleServiceSpy },
            { provide: FilterService, useValue: filterServiceSpy },
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    describe('onChannelChange func', () => {
        it('should invoke onChangeTitle function in titleservice with appropriate name param and onChangeChannel in newsservice with input id', () => {
            component.onChannelChange(stubChannels[0].id);
            expect(titleServiceSpy.onChangeTitle).toHaveBeenCalledWith('AAA');
            expect(newsServiceSpy.onChangeChannel).toHaveBeenCalledWith(stubChannels[0].id);
        });
    });

    describe('onShowOnlyMyArticlesChange', () => {
        it('if set to true should set isSelectDisabled to true, invoke filterService func with true param and set title to News-app', () => {
            component.onShowOnlyMyArticlesChange(true);

            expect(filterServiceSpy.onShowOnlyMyArticlesChange).toHaveBeenCalledWith(true);
            expect(component.isSelectDisabled).toBe(true);
            expect(titleServiceSpy.onChangeTitle).toHaveBeenCalledWith('News-App');
        });

        it('if set to false should set isSelectDisabled to false, invoke filterService func with false param and set title to channel name', () => {
            component.newsService.channel = stubChannels[0].id;
            component.onShowOnlyMyArticlesChange(false);

            expect(filterServiceSpy.onShowOnlyMyArticlesChange).toHaveBeenCalledWith(false);
            expect(component.isSelectDisabled).toBe(false);
            expect(titleServiceSpy.onChangeTitle).toHaveBeenCalledWith(stubChannels[0].name);
        });
    });

    describe('getChannels func', () => {
        it('should invoke getChannelsList function in apiService set channels and invoke onChannelChange func', () => {
            apiServiceSpy.getChannelsList.and.returnValue(of(stubChannels));
            spyOn(component, 'onChannelChange').and.callFake((channel) => {});

            component.getChannels();

            expect(component.channels).toEqual(stubChannels);
            expect(apiServiceSpy.getChannelsList).toHaveBeenCalled();
            expect(component.onChannelChange).toHaveBeenCalled();
        });
    });

    describe('changeFilter', () => {
        it('should invoke onChangeKeyword func of filter service', () => {
            component.changeFilter('someWord');

            expect(filterServiceSpy.onChangeKeyword).toHaveBeenCalledWith('someWord');
        });
    });

});
