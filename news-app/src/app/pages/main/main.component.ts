import { Component, OnInit } from '@angular/core';
import { ShowControlsService } from '../../services/show-controls.service';
import { NewsService } from '../../services/news.service';
import {FilterService} from '../../services/filter.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public articles: object;
    public isLoadButtonVisible: boolean;
    public maxVisibleItems: number;
    public defaultVisibleItemsLength: number;
    public renderEditButtons: boolean;

    constructor(
        private showControlsService: ShowControlsService,
        private newsService: NewsService,
        private filterService: FilterService,
    ) {
        this.isLoadButtonVisible = false;
        this.defaultVisibleItemsLength = 4;
        this.maxVisibleItems = this.defaultVisibleItemsLength;
        this.renderEditButtons = this.newsService.showOnlyMyArticles;
    }

    ngOnInit() {
        this.showControlsService.onSwitchView(true);
        this.newsService.onShowOnlyMyArticlesChange(false);
        this.renderEditButtons = false;

        // this.generateArticles(this.maxVisibleItems);

        this.newsService.switchChannel.subscribe((channel: string) => {
            this.filterService.onChangeKeyword('');
            this.maxVisibleItems = this.defaultVisibleItemsLength;
            this.generateArticles(this.maxVisibleItems);
        });

        this.newsService.switchArticles.subscribe((showOnlyMyArticles: boolean) => {
            this.filterService.onChangeKeyword('');
            this.renderEditButtons = showOnlyMyArticles;
            this.maxVisibleItems = this.defaultVisibleItemsLength;
            this.generateArticles(this.maxVisibleItems);
        });

        this.newsService.updateArticles.subscribe(() => {
            this.generateArticles(this.maxVisibleItems);
        });
    }

    ngOnDestroy() {
        this.showControlsService.onSwitchView(false);
        this.filterService.onChangeKeyword('');
    }

    generateArticles(maxVisibleItems) {
        const { showOnlyMyArticles } = this.newsService;
        const articles = !showOnlyMyArticles ? this.newsService.newsApiArticles : this.newsService.myArticles;
        const totalArticlesLength = articles ? articles.length : null;

        if (articles) {

            if (this.maxVisibleItems >= totalArticlesLength) {
                this.isLoadButtonVisible = false;
                this.articles = articles;
            } else {
                this.isLoadButtonVisible = true;
                this.articles = articles.slice(0, maxVisibleItems);
            }
        }
    }

    showMoreArticles() {
        this.maxVisibleItems += this.defaultVisibleItemsLength;
        this.generateArticles(this.maxVisibleItems);
    }

}
