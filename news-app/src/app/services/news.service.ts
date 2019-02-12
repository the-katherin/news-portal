import { Injectable, EventEmitter } from '@angular/core';
import { newsApiArticles, myArticles } from '../../data/news.js';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    public showOnlyMyArticles: boolean;
    public newsApiArticles: object;
    public myArticles: object;
    public channel: string;

    constructor() {
        this.showOnlyMyArticles = false;
        this.newsApiArticles = newsApiArticles;
        this.myArticles = myArticles;
    }

    public switchChannel: EventEmitter<string> = new EventEmitter();

    onChangeChannel(channel: string) {
        this.channel = channel;
        this.switchChannel.emit(channel);
    }



    // onSwitchView(isVisible: boolean) {
    //     this.showControls = isVisible;
    //     this.switchControls.emit(isVisible);
    // }
}
