import { TestBed, getTestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
    let injector: TestBed;
    let service: FilterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FilterService]
        });

        injector = getTestBed();
        service = injector.get(FilterService);
    });

    it('should be created', () => {
        const service: FilterService = TestBed.get(FilterService);
        expect(service).toBeTruthy();
    });

    describe('onChangeKeyword function', () => {
        it('should change keyword and emit event', () => {
            const dummyKeyword = 'word';
            spyOn(service.changeKeyword, 'emit');
            service.onChangeKeyword(dummyKeyword);
            expect(service.keyword).toBe(dummyKeyword);
            expect(service.changeKeyword.emit).toHaveBeenCalledWith(dummyKeyword);
        });
    });

    describe('onShowOnlyMyArticlesChange function', () => {
        it('should reset keyword, change showOnlyMyArticles value and emit event', () => {
            const showOnlyMyArticles = true;
            spyOn(service.switchArticles, 'emit');
            service.onShowOnlyMyArticlesChange(showOnlyMyArticles);
            expect(service.keyword).toBe('');
            expect(service.switchArticles.emit).toHaveBeenCalledWith(showOnlyMyArticles);
        });
    });
});
