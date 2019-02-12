import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    public title: string;

    constructor() {
        this.title = 'News-App';
    }

    public changeTitle: EventEmitter<string> = new EventEmitter();

    onChangeTitle(title: string) {
        this.title = title;
        this.changeTitle.emit(title);
    }

}
