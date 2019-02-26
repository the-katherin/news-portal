import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleComponent } from './article.component';
import {MyArticlesService} from "../../services/my-articles.service";
import {NewsService} from "../../services/news.service";


import articleStub from "../../mocks/articleMock";
import {of} from "rxjs";

// import {DebugElement} from '@angular/core/src/debug/debug_node';
// import { By } from '@angular/platform-browser'

describe('ArticleComponent', () => {
    let component: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;
    let article: any;
    let articleEl: any;
    let expectedArticle: any;
    class MockComponent {}

    let newsServiceSpy = jasmine.createSpyObj('NewsService', ['onUpdateMyArticles']);
    let myArticlesServiceSpy = jasmine.createSpyObj('MyArticlesService', ['deleteArticle']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{path: 'articles/:id', component: MockComponent}])
            ],
            declarations: [ArticleComponent],
            providers: [
                { provide: MyArticlesService, useValue: myArticlesServiceSpy },
                { provide: NewsService, useValue: newsServiceSpy },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleComponent);
        component = fixture.componentInstance;

//         article  = fixture.debugElement.query(By.css('.hero'));
//         articleEl = article.nativeElement;
//
// // mock the hero supplied by the parent component
//         expectedArticle = articleStub;

        component.article = articleStub;

        fixture.detectChanges(); // is used for data binding
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('deleteArticle func', () => {
        it('should invoke deletearticle function in myArticles service and update func in newsservice', () => {

            myArticlesServiceSpy.deleteArticle.and.returnValue(of({}));

            component.deleteArticle();
            expect(myArticlesServiceSpy.deleteArticle).toHaveBeenCalled();
            expect(newsServiceSpy.onUpdateMyArticles).toHaveBeenCalled();
        });
    });
});
