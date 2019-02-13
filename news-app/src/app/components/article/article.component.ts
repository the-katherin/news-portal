import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    @Input() article: {
        url: string,
        title: string,
        id: number,
        description: string,
        author: string,
        publishedAt: string,
        sourceName: string,
    };

    @Input() renderEditButtons: boolean;

    public url: string;
    public routerLink: string;
    public title: string;
    public description: string;
    public author: string;
    public date: string;
    public name: string;
    public editLink: string;

    constructor() { }

    ngOnInit() {
       this.url = this.article.url;
       this.routerLink = `articles/${this.article.id}`;
       this.title = this.article.title;
       this.description = this.article.description;
       this.author = this.article.author;
       this.date = this.article.publishedAt;
       this.name = this.article.sourceName;
       this.editLink = `articles-edit/${this.article.id}`;
    }

    deleteArticle() {
        console.log('delete');
    }

}
