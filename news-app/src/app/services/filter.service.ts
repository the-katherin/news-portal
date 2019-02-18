import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

    public keyword: string;

    public changeKeyword: EventEmitter<string> = new EventEmitter();

    onChangeKeyword(keyword: string) {
        this.keyword = keyword;
        this.changeKeyword.emit(keyword);
    }
}
