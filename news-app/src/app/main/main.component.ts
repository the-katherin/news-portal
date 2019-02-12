import { Component, OnInit } from '@angular/core';
import { ShowControlsService } from '../services/show-controls.service';
import { NewsService } from '../services/news.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public articles: object;

    constructor(
        private showControlsService: ShowControlsService,
        private newsService: NewsService,
    ) { }

    ngOnInit() {
        this.showControlsService.onSwitchView(true);

        this.articles = this.newsService.newsApiArticles['BBC']; // TODO CHANGE TO DEFAULT CHANNEL OR CHANNELS LIST [0]

        this.newsService.switchChannel.subscribe((channel: string) => { // todo if all
            this.articles = this.newsService.newsApiArticles[channel];
            console.log(this.articles);
        });

        console.log(this.articles);
    }

    ngOnDestroy() {
        this.showControlsService.onSwitchView(false);
    }

}
