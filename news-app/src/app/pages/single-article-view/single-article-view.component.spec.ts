import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArticleViewComponent } from './single-article-view.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import articleStub from '../../mocks/articleMock';
import { NewsService } from "../../services/news.service";

describe('SingleArticleViewComponent', () => {
    let component: SingleArticleViewComponent;
    let fixture: ComponentFixture<SingleArticleViewComponent>;
    const newsServiceMock = { articles: [articleStub] };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [SingleArticleViewComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: NewsService, useValue: newsServiceMock },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SingleArticleViewComponent);
        component = fixture.componentInstance;
        component.route.snapshot.params.id = articleStub._id;
        fixture.detectChanges();
    });

    it('should create, get articles from newservice and set article', () => {
        expect(component).toBeTruthy();
        expect(component.article).toEqual(articleStub);
    });
});
