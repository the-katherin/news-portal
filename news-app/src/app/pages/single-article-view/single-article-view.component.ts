import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-single-article-view',
    templateUrl: './single-article-view.component.html',
    styleUrls: ['./single-article-view.component.scss']
})
export class SingleArticleViewComponent implements OnInit {

    public article: any;
    public articleSourceName: string;

    constructor(
        private route: ActivatedRoute,
        private newsService: NewsService,
        private filterService: FilterService,

    ) { }

    ngOnInit() {
        const articleId = this.route.snapshot.params.id;
        const { showOnlyMyArticles } = this.filterService;
        const articles = this.newsService.articles;
        //@ts-ignore
        this.article = articles.find(articleItem => articleItem._id === articleId);
        this.articleSourceName = typeof this.article.source === 'string' ? this.article.source : this.article.source.name;
    }

}
