import { TestBed } from '@angular/core/testing';

import { ShowControlsService } from './show-controls.service';

describe('ShowControlsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ShowControlsService = TestBed.get(ShowControlsService);
        expect(service).toBeTruthy();
    });
});
