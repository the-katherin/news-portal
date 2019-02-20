import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

    public keyword: string;
    public showOnlyMyArticles: boolean;

    constructor() {
        this.showOnlyMyArticles = false;
    }

    public changeKeyword: EventEmitter<string> = new EventEmitter();
    public switchArticles: EventEmitter<boolean> = new EventEmitter();

    onChangeKeyword(keyword: string) {
        this.keyword = keyword;
        this.changeKeyword.emit(keyword);
    }

    onShowOnlyMyArticlesChange(value: boolean) {
        this.onChangeKeyword('');
        this.showOnlyMyArticles = value;
        this.switchArticles.emit(value);
    }
}
