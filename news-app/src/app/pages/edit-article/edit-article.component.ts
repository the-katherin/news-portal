import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../services/title.service';
import { NewsService } from '../../services/news.service';
import {FilterService} from '../../services/filter.service';

@Component({
    selector: 'app-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

    public article: object;
    public isEditMode: boolean;
    public articleId: string;

    constructor(
        private titleService: TitleService,
        private newsService: NewsService,
        private route: ActivatedRoute,
        private filterService: FilterService,
    ) {
        this.isEditMode = true;
    }

    ngOnInit() {
        this.titleService.onChangeTitle('Edit Article');

        this.articleId = this.route.snapshot.params.id;
        const { showOnlyMyArticles } = this.filterService;
        const articles = this.newsService.articles;
        //@ts-ignore
        this.article = articles.find(articleItem => articleItem._id === this.articleId);
    }

}
