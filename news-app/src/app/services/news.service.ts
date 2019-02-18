import { Injectable, EventEmitter } from '@angular/core';
import { newsApiArticles, myArticles } from '../../data/news.js';
import { ApiService } from './api.service';
import { MyArticlesService } from './my-articles.service';
import { Article, MyArticle } from '../interfaces';

import uuidv1 from 'uuid/v1';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    public showOnlyMyArticles: boolean;
    public newsApiArticles: any;
    public myArticles: object;
    public channel: string;
    public allArticles: object;

    constructor(
        private apiService: ApiService,
        private myArticlesService: MyArticlesService,

    ) {
        this.showOnlyMyArticles = false;
    }

    public switchChannel: EventEmitter<string> = new EventEmitter();
    public switchArticles: EventEmitter<boolean> = new EventEmitter();
    public updateArticles: EventEmitter<any> = new EventEmitter();

    onChangeChannel(channel: string) {
        this.channel = channel;
        this.getNewsApiArticles(channel);
    }

    onUpdateMyArticles() {
        this.getMyArticles();
    }

    onShowOnlyMyArticlesChange(value: boolean) {
        this.showOnlyMyArticles = value;
        this.getMyArticles();
        this.switchArticles.emit(value);
    }

    getMyArticles() {
        this.myArticlesService.getMyArticles().subscribe(
            (articles: Array<MyArticle>) => {
                this.myArticles = articles;
                this.updateArticles.emit();
            },
            (error) => console.log(error)
        );
    }

    getNewsApiArticles(channel) {
        this.apiService.getArticles(channel).subscribe(
            (articles: Array<Article>) => {
                this.newsApiArticles = this.setArticleIds(articles);
                this.switchChannel.emit(channel);
            },
            (error) => console.log(error)
        );
    }

    setArticleIds(articles) {
        return articles.map(article => ({ ...article, _id: uuidv1() }));
    }
}
