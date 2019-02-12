import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TitleService } from '../services/title.service';
import { NewsService } from '../services/news.service';

@Component({
    selector: 'controls-panel',
    templateUrl: './controls-panel.component.html',
    styleUrls: ['./controls-panel.component.scss']
})
export class ControlsPanelComponent implements OnInit {

    public isSelectDisabled: boolean;

    constructor(
        private titleService: TitleService,
        private newsService: NewsService,
    ) { }

    ngOnInit() {
        this.isSelectDisabled = false;
        this.titleService.onChangeTitle('BBC');
    }

    onChannelChange(value) {
        this.titleService.onChangeTitle(value);
        this.newsService.onChangeChannel(value);
    }

    onShowOnlyMyArticlesChange(value) {
        this.newsService.onShowOnlyMyArticlesChange(value);
        this.isSelectDisabled = value;

        if (value) {
            this.titleService.onChangeTitle('News-App');
        } else {
            this.titleService.onChangeTitle(this.newsService.channel);
        }
    }

}
