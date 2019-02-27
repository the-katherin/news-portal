import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticleComponent } from './article.component';
import { MyArticlesService } from "../../services/my-articles.service";
import { NewsService } from "../../services/news.service";


import articleStub from "../../mocks/articleMock";
import { of } from "rxjs";
import { By } from '@angular/platform-browser';

describe('ArticleComponent', () => {
    let component: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;
    class MockComponent { }
    let editLink;
    let editLinkEl;

    let newsServiceSpy = jasmine.createSpyObj('NewsService', ['onUpdateMyArticles']);
    let myArticlesServiceSpy = jasmine.createSpyObj('MyArticlesService', ['deleteArticle']);


    const customMatchers = {
        toHaveEditLink: function () {
            return {
                compare: function (actual, expected) {

                    let result;
                    let linkRegexp = /^\/articles-edit\/\w{1,}/i;

                    const hrefAttribute = actual.getAttribute('href');

                    if (!hrefAttribute) {
                        result = {
                            pass: false,
                            message: 'Current element doesn`t have links',
                        };

                        return result;
                    }

                    let isCorrectLink = linkRegexp.test(hrefAttribute);

                    result = { pass: isCorrectLink };

                    if (!result.pass) {
                        result.message = `Expected link to be /articles-edit/:id, but instead have got ${hrefAttribute}`;
                    }

                    return result;
                }
            }
        }
    };

    beforeEach(() => {
        jasmine.addMatchers(customMatchers);

    });


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{ path: 'articles/:id', component: MockComponent }])
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
        component.renderEditButtons = true;

        component.article = articleStub;

        fixture.detectChanges(); // is used for data binding
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check router edit link', () => {
        editLink = fixture.debugElement.query(By.css('.edit-link'));
        editLinkEl = editLink.nativeElement;

        // @ts-ignore
        expect(editLinkEl).toHaveEditLink();
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
