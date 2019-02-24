import { TestBed, getTestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { ApiService } from './api.service';
import { MyArticlesService } from './my-articles.service';

describe('NewsService', () => {
    const stubChannel = 'BBC';
    const stubArticles = [{ title: 'title' }, {}];
    const stubMyArticles = [{ title: 'Mytitle' }, {}, {}];

    let injector: TestBed;
    let service: NewsService;
    let apiServiceSpy = jasmine.createSpyObj('ApiService', ['getArticles']);
    let myArticlesServiceSpy = jasmine.createSpyObj('MyArticlesService', ['getMyArticles']);
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                NewsService,
                { provide: ApiService, useValue: apiServiceSpy },
                { provide: MyArticlesService, useValue: myArticlesServiceSpy }
            ],
        });
        injector = getTestBed();
        service = injector.get(NewsService);
        apiServiceSpy = injector.get(ApiService);
        myArticlesServiceSpy = injector.get(MyArticlesService);
        httpMock = injector.get(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('onChangeChannel', () => {

        it('should set channel in service and call getNewsApiArticles', () => {
            spyOn(service, 'getNewsApiArticles').and.callFake((channel) => stubArticles);
            service.onChangeChannel(stubChannel);
            expect(service.channel).toBe(stubChannel);
            expect(service.getNewsApiArticles).toHaveBeenCalledWith(stubChannel);
        });
    });

    describe('onUpdateMyArticles', () => {
        it('should call getMyArticles', () => {
            spyOn(service, 'getMyArticles').and.callFake(() => stubArticles);
            service.onUpdateMyArticles();
            expect(service.getMyArticles).toHaveBeenCalled();
        });
    });

    describe('onUpdateArticles', () => {
        it('should call getMyArticles if input is true', () => {
            const showOnlyMyArticles = true;
            spyOn(service, 'getNewsApiArticles').and.callFake((currentChannel) => stubArticles);
            spyOn(service, 'getMyArticles').and.callFake(() => stubArticles);
            service.onUpdateArticles(showOnlyMyArticles);
            expect(service.getMyArticles).toHaveBeenCalled();
            expect(service.getNewsApiArticles).not.toHaveBeenCalled();
        });
        it('should call getNewsApiArticles with current channel param if input is false', () => {
            const currentChannel = service.channel;
            const showNewsApiArticles = false;
            spyOn(service, 'getNewsApiArticles').and.callFake((currentChannel) => stubArticles);
            spyOn(service, 'getMyArticles').and.callFake(() => stubArticles);
            service.onUpdateArticles(showNewsApiArticles);
            expect(service.getMyArticles).not.toHaveBeenCalled();
            expect(service.getNewsApiArticles).toHaveBeenCalledWith(currentChannel);
        });
    });

    describe('getNewsApiArticles', () => {
        it('should set articles, newsApiArticles, and call setArticleIds and switchChannel.emit functions', () => {
            spyOn(service.switchChannel, 'emit');
            spyOn(service, 'setArticleIds').and.callFake(() => stubArticles);
            apiServiceSpy.getArticles.and.returnValue(of(stubArticles));

            service.getNewsApiArticles(stubChannel);

            expect(service.articles).toEqual(stubArticles);
            expect(service.newsApiArticles).toEqual(stubArticles);
            expect(apiServiceSpy.getArticles).toHaveBeenCalled();
            expect(service.setArticleIds).toHaveBeenCalledWith(stubArticles);
            expect(service.switchChannel.emit).toHaveBeenCalledWith(stubChannel);
        });
    });

    describe('getMyArticles', () => {
        it('should set articles, myArticles and call updateArticles.emit function', () => {
            spyOn(service.updateArticles, 'emit');
            myArticlesServiceSpy.getMyArticles.and.returnValue(of(stubMyArticles));

            service.getMyArticles();

            expect(myArticlesServiceSpy.getMyArticles).toHaveBeenCalled();
            expect(service.articles).toEqual(stubMyArticles);
            expect(service.myArticles).toEqual(stubMyArticles);
            expect(service.updateArticles.emit).toHaveBeenCalled();
        });
    });

    describe('setArticleIds function', () => {
        it('should set ids for each article', () => {
            const articles = service.setArticleIds(stubArticles);

            expect(articles[0].title).toBe('title');
            expect(articles).not.toEqual(stubArticles);

            articles.forEach(article => {
                expect(article._id).toBeTruthy();
            });
        });
    });
});
