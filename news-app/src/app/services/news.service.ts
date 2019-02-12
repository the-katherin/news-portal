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
    public allArticles: object;

    constructor() {
        this.channel = 'BBC';
        this.showOnlyMyArticles = false;
        this.newsApiArticles = newsApiArticles;
        this.myArticles = myArticles;
        this.allArticles = this.generateArticles();
    }

    public switchChannel: EventEmitter<string> = new EventEmitter();
    public switchArticles: EventEmitter<boolean> = new EventEmitter();

    onChangeChannel(channel: string) {
        this.channel = channel;
        this.switchChannel.emit(channel);
    }

    generateArticles() {
        const allArticles = [];

        for (const key in newsApiArticles) {
            const articlesArray = newsApiArticles[key];

            for (const item of articlesArray) {
                allArticles.push(item);
            }
        }

        for (const item of myArticles) {
            allArticles.push(item);
        }

        return allArticles;
    }

    onShowOnlyMyArticlesChange(value: boolean) {
        this.showOnlyMyArticles = value;
        this.switchArticles.emit(value);
    }


}
