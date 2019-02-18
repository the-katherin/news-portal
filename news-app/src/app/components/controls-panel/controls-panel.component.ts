import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { NewsService } from '../../services/news.service';
import { ApiService } from '../../services/api.service';

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
        this.newsService.onChangeChannel(channelId); // todo check
    }

    onShowOnlyMyArticlesChange(value) {
        this.newsService.onShowOnlyMyArticlesChange(value);
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

    getChannels() { // todo maybe move to news service or channels service
        this.apiService.getChannelsList().subscribe(
            (channels: any) => {
                console.log(channels);

                this.channels = channels;
                this.onChannelChange(channels[0].id);
            },
            (error) => console.log(error)
        )
    }

}
