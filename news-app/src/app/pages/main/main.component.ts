import {Component, OnDestroy, OnInit} from '@angular/core';
import { NewsService } from '../../services/news.service';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    public articles: object;
    public isLoadButtonVisible: boolean;
    public maxVisibleItems: number;
    public defaultVisibleItemsLength: number;
    public renderEditButtons: boolean;

    constructor(
        private newsService: NewsService,
        private filterService: FilterService,
    ) {
        this.isLoadButtonVisible = false;
        this.defaultVisibleItemsLength = 4;
        this.maxVisibleItems = this.defaultVisibleItemsLength;
        this.renderEditButtons = this.filterService.showOnlyMyArticles;
    }

    ngOnInit() {
        this.renderEditButtons = false;

        this.newsService.switchChannel.subscribe((channel: string) => {
            this.filterService.onChangeKeyword('');
            this.maxVisibleItems = this.defaultVisibleItemsLength;
            this.generateArticles(this.maxVisibleItems);
        });

        // this.filterService.switchArticles.subscribe((showOnlyMyArticles: boolean) => {
        //     this.newsService.onUpdateArticles(showOnlyMyArticles);
        //     this.renderEditButtons = showOnlyMyArticles;
        //     this.maxVisibleItems = this.defaultVisibleItemsLength;
        //     this.generateArticles(this.maxVisibleItems);
        // });
        //
        // this.newsService.updateArticles.subscribe(() => {
        //     this.generateArticles(this.maxVisibleItems);
        // });
    }

    ngOnDestroy() {
        this.filterService.onChangeKeyword('');
    }

    generateArticles(maxVisibleItems) {
        const articles = this.newsService.articles;
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
