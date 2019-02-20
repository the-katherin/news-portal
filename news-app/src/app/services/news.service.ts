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

    public newsApiArticles: any;
    public myArticles: object;
    public channel: string;
    public articles: any;

    constructor(
        private apiService: ApiService,
        private myArticlesService: MyArticlesService,

    ) { }

    public switchChannel: EventEmitter<string> = new EventEmitter();
    public updateArticles: EventEmitter<any> = new EventEmitter();

    onChangeChannel(channel: string) {
        this.channel = channel;
        this.getNewsApiArticles(channel);
    }

    onUpdateMyArticles() {
        this.getMyArticles();
    }


    onUpdateArticles(showOnlyMyArticles) {
        showOnlyMyArticles ? this.getMyArticles() : this.getNewsApiArticles(this.channel);
    }

    getMyArticles() {
        this.myArticlesService.getMyArticles().subscribe(
            (articles: Array<MyArticle>) => {
                this.myArticles = articles;
                this.articles = this.myArticles;
                this.updateArticles.emit();
            },
            (error) => console.log(error)
        );
    }

    getNewsApiArticles(channel) {
        this.apiService.getArticles(channel).subscribe(
            (articles: Array<Article>) => {
                this.newsApiArticles = this.setArticleIds(articles);
                this.articles = this.newsApiArticles;
                this.switchChannel.emit(channel);
            },
            (error) => console.log(error)
        );
    }

    setArticleIds(articles) {
        return articles.map(article => ({ ...article, _id: uuidv1() }));
    }
}
