import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MyArticlesService } from './my-articles.service';

import { MY_ARTICLES_ENDPOINT } from '../apiConfig';
import { Article, MyArticle } from '../interfaces';

fdescribe('MyArticlesService', () => {
    let injector: TestBed;
    let service: MyArticlesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MyArticlesService]
        });
        injector = getTestBed();
        service = injector.get(MyArticlesService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        const service: MyArticlesService = TestBed.get(MyArticlesService);
        expect(service).toBeTruthy();
    });


    describe('getMyArticles function', () => {
        it('getMyArticles should return Array<MyArticle>', () => {
            const dummyArticles = [
                {
                    _id: '1',
                    author: 'author',
                    title: 'title',
                    description: 'description',
                    source: 'source',
                    publishedAt: 'someDate',
                },
                {
                    _id: '2',
                    author: 'author2',
                    title: 'title2',
                    description: 'description2',
                    source: 'source2',
                    publishedAt: 'someDate2',
                }
            ];

            service.getMyArticles().subscribe((articles: Array<MyArticle>) => {
                expect(articles.length).toBe(2);
                expect(articles).toEqual(dummyArticles);
            });

            const req = httpMock.expectOne(MY_ARTICLES_ENDPOINT);
            expect(req.request.method).toBe("GET");
            req.flush(dummyArticles);
        });
    });

    describe('editArticle function', () => {
        it('editArticle should send a put request', () => {
            const dummyArticle =
            {
                _id: '1',
                author: 'author',
                title: 'title',
                description: 'description',
                source: 'source',
                publishedAt: 'someDate',
            };

            const id = '5c6dadd771cf9e0017b69f47';

            service.editArticle(dummyArticle, id).subscribe(response => {
                expect(response).toBe('success');
            });

            const req = httpMock.expectOne(`${MY_ARTICLES_ENDPOINT}/${id}`);
            expect(req.request.method).toBe("PUT");
            req.flush('success');
        });
    });

    describe('addArticle function', () => {
        it('addArticle should send a post request', () => {
            const dummyArticle =
            {
                _id: '1',
                author: 'author',
                title: 'title',
                description: 'description',
                source: 'source',
                publishedAt: 'someDate',
            };

            service.addArticle(dummyArticle).subscribe(response => {
                expect(response).toBe('success');
            });

            const req = httpMock.expectOne(`${MY_ARTICLES_ENDPOINT}`);
            expect(req.request.method).toBe("POST");
            req.flush('success');
        });

    });

    describe('deleteArticle function', () => {
        it('deleteArticle should send a delete request', () => {
            const id = '5c6dadd771cf9e0017b69f47';

            service.deleteArticle(id).subscribe(response => {
                expect(response).toBe('success');
            });

            const req = httpMock.expectOne(`${MY_ARTICLES_ENDPOINT}/${id}`);
            expect(req.request.method).toBe("DELETE");
            req.flush('success');
        });

    });
});
