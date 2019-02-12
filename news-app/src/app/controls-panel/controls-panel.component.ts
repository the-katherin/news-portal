import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TitleService } from '../services/title.service';
import { NewsService } from '../services/news.service';

@Component({
    selector: 'controls-panel',
    templateUrl: './controls-panel.component.html',
    styleUrls: ['./controls-panel.component.scss']
})
export class ControlsPanelComponent implements OnInit {

    constructor(
        private titleService: TitleService,
        private newsService: NewsService,
    ) { }

    ngOnInit() {
        this.titleService.onChangeTitle('BBC');
        this.newsService.onChangeChannel('BBC');
    }

    onChannelChange(value) {
        this.titleService.onChangeTitle(value);
        this.newsService.onChangeChannel(value);
    }

}
