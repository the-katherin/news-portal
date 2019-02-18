import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'app-single-article-view',
    templateUrl: './single-article-view.component.html',
    styleUrls: ['./single-article-view.component.scss']
})
export class SingleArticleViewComponent implements OnInit {

    public article: object;

    constructor(
        private route: ActivatedRoute,
        private newsService: NewsService,
    ) { }

    ngOnInit() {
        const articleId = this.route.snapshot.params.id;
        const { showOnlyMyArticles } = this.newsService;
        const articles = !showOnlyMyArticles ? this.newsService.newsApiArticles : this.newsService.myArticles;
        //@ts-ignore
        this.article = articles.find(articleItem => articleItem.id === articleId);
    }

}
