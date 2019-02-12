import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ShowControlsService {

    public showControls: boolean;

    constructor() {
        this.showControls = true;
    }

    public switchControls: EventEmitter<boolean> = new EventEmitter();

    onSwitchView(isVisible: boolean) {
        this.showControls = isVisible;
        this.switchControls.emit(isVisible);
    }
}
