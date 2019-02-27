import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import articleStub from "../../mocks/articleMock";
import { NewsService } from "../../services/news.service";
import { FilterService } from "../../services/filter.service";

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    const newsServiceMock = {
        articles: [articleStub],
        switchChannel: { subscribe: () => { } },
        updateArticles: { subscribe: () => { } },
    };

    const filterServiceMock = {
        switchArticles: { subscribe: () => { } },
        onChangeKeyword: () => { },
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [MainComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: NewsService, useValue: newsServiceMock },
                { provide: FilterService, useValue: filterServiceMock },
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
