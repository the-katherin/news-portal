import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from "../../services/title.service";
import { NewsService } from "../../services/news.service";

@Component({
    selector: 'app-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

    public article: object;

    constructor(
        private titleService: TitleService,
        private newsService: NewsService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.titleService.onChangeTitle('Edit Article');

        const articleId = this.route.snapshot.params.id;
        const { allArticles } = this.newsService;
        //@ts-ignore
        this.article = allArticles.find((articleItem) => articleItem.id === articleId);
    }

}
