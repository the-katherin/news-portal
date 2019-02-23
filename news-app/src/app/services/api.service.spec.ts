import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import {
    API_KEY,
    CHANNELS_URL,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT
} from '../apiConfig';

fdescribe('ApiService', () => {
    let injector: TestBed;
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });
        injector = getTestBed();
        service = injector.get(ApiService);
        httpMock = injector.get(HttpTestingController); // injects into service
    });


    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
    });

    describe('#getChannelsList', () => {
        it('should return channels', () => {
            const dummyChannels = [
                { id: '1', name: 'BBC' },
                { id: '2', name: 'CNN' }
            ];

            service.getChannelsList().subscribe(channels => {
                expect(channels.length).toBe(2);
                expect(channels).toEqual(dummyChannels);
            });

            const req = httpMock.expectOne(CHANNELS_URL);
            expect(req.request.method).toBe("GET");
            req.flush({ sources: dummyChannels });
        });
    });

    describe('#getArticles', () => {
        it('should return articles', () => {
            const dummyArticles = [
                {
                    source: {},
                    author: 'author',
                    title: 'title',
                    description: 'description',
                },
                {
                    source: {},
                    author: 'author2',
                    title: 'title2',
                    description: 'description2',
                }
            ];

            const dummyChannel = 'BBC';
            const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${dummyChannel}&language=${LANGUAGE}&apiKey=${API_KEY}`;

            service.getArticles(dummyChannel).subscribe(articles => {
                expect(articles.length).toBe(2);
                expect(articles).toEqual(dummyArticles);
            });

            const req = httpMock.expectOne(url);
            expect(req.request.method).toBe("GET");
            req.flush({ articles: dummyArticles });
        });
    });
});
