import { TestBed, getTestBed } from '@angular/core/testing';

import { TitleService } from './title.service';

fdescribe('TitleService', () => {
    const stubTitle = 'Title';
    let injector: TestBed;
    let service: TitleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TitleService],
        });

        injector = getTestBed();
        service = injector.get(TitleService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('onChangeTitle', () => {
        it('should set title and emit changeTitle function', () => {
            spyOn(service.changeTitle, 'emit');

            service.onChangeTitle(stubTitle);

            expect(service.title).toBe(stubTitle);
            expect(service.changeTitle.emit).toHaveBeenCalledWith(stubTitle);
        });
    });
});
