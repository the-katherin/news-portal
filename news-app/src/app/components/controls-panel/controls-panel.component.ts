import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { NewsService } from '../../services/news.service';
import { ApiService } from '../../services/api.service';
import { FilterService } from '../../services/filter.service';
import {Channel} from '../../interfaces';

@Component({
    selector: 'controls-panel',
    templateUrl: './controls-panel.component.html',
    styleUrls: ['./controls-panel.component.scss']
})

export class ControlsPanelComponent implements OnInit {

    public isSelectDisabled: boolean;
    public checkBoxLabel: string;
    public channels: object;

    constructor(
        private titleService: TitleService,
        private newsService: NewsService,
        private apiService: ApiService,
        private filterService: FilterService,
    ) {
        this.checkBoxLabel = 'Only created by me';
    }

    ngOnInit() {
        this.isSelectDisabled = false;
        this.getChannels();
    }

    onChannelChange(channelId) {
        // @ts-ignore
        const channelName = this.channels.find(channel => channel.id === channelId).name;

        this.titleService.onChangeTitle(channelName);
        this.newsService.onChangeChannel(channelId);
    }

    onShowOnlyMyArticlesChange(value) {
        this.filterService.onShowOnlyMyArticlesChange(value);
        this.isSelectDisabled = value;

        if (value) {
            this.titleService.onChangeTitle('News-App');
        } else {
            const channelId = this.newsService.channel;
            // @ts-ignore
            const channelName = this.channels.find(channel => channel.id === channelId).name;

            this.titleService.onChangeTitle(channelName);
        }
    }

    getChannels() {
        this.apiService.getChannelsList().subscribe(
            (channels: Array<Channel>) => {
                this.channels = channels;
                this.onChannelChange(channels[0].id);
            },
            (error) => console.log(error)
        );
    }

    changeFilter(keyword: string) {
        this.filterService.onChangeKeyword(keyword);
    }
}
