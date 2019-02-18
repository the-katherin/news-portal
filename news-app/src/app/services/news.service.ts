import { Injectable, EventEmitter } from '@angular/core';
import { newsApiArticles, myArticles } from '../../data/news.js';
import { ApiService } from './api.service';

import uuidv1 from 'uuid/v1';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    public showOnlyMyArticles: boolean;
    public newsApiArticles: any; // todo array
    public myArticles: object;
    public channel: string;
    public allArticles: object;

    constructor(private apiService: ApiService) {
        this.showOnlyMyArticles = false;

        // this.myArticles = myArticles;
        // this.allArticles = this.generateArticles();
    }

    public switchChannel: EventEmitter<string> = new EventEmitter();
    public switchArticles: EventEmitter<boolean> = new EventEmitter();

    onChangeChannel(channel: string) {
        this.channel = channel;
        this.getNewsApiArticles(channel);
    }

    generateArticles() { // all articles
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

        this.apiService.getMyArticles().subscribe(
            (articles: any) => {
                this.myArticles = articles;
                console.log(this.myArticles);
            },
            (error) => console.log(error)
        );

    }

    getNewsApiArticles(channel) {
        this.apiService.getArticles(channel).subscribe(
            (articles: any) => {
                this.newsApiArticles = this.setArticleIds(articles);
                console.log(this.newsApiArticles);
                this.switchChannel.emit(channel);
            },
            (error) => console.log(error)
        )
    }

    setArticleIds(articles) {
        return articles.map(article => ({ ...article, id: uuidv1() }));
    }


}
