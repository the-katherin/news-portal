import { Component, OnInit, Input } from '@angular/core';
import {MyArticlesService} from '../../services/my-articles.service';
import {Router} from '@angular/router';
import {NewsService} from '../../services/news.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    @Input() article: {
        urlToImage: string,
        title: string,
        _id: number,
        description: string,
        author: string,
        publishedAt: string,
        source: any,
    };

    @Input() renderEditButtons: boolean;

    public urlToImage: string;
    public routerLink: string;
    public title: string;
    public description: string;
    public author: string;
    public date: string;
    public name: string;
    public editLink: string;

    constructor(
        private myArticlesService: MyArticlesService,
        private router: Router,
        private newsService: NewsService,
    ) { }

    ngOnInit() {
        this.urlToImage = this.article.urlToImage || null;
        this.routerLink = `articles/${this.article._id}`;
        this.title = this.article.title;
        this.description = this.article.description;
        this.author = this.article.author;
        this.date = this.article.publishedAt;
        this.name = typeof this.article.source === 'string' ? this.article.source : this.article.source.name;
        this.editLink = `articles-edit/${this.article._id}`;
    }

    deleteArticle() {
        this.myArticlesService.deleteArticle(this.article._id).subscribe(
            () => {
                this.newsService.onUpdateMyArticles();
                alert('Successfully deleted');
            },
            (error) => console.log('error here:', error)
        );
    }

}
