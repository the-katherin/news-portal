import { Component, Input, OnInit } from '@angular/core';
import { ShowControlsService } from '../services/show-controls.service';
import { TitleService } from '../services/title.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() pageTitle: string;

    public showControls: boolean;
    public title: string;

    constructor(
        private showControlsService: ShowControlsService,
        private titleService: TitleService,
    ) { }

    // constructor() { }

    ngOnInit() {
        // this.showControls = this.showControlsService.showControls;
        this.showControlsService.switchControls.subscribe((isVisible: boolean) => {
            this.showControls = isVisible;
        });

        this.title = this.titleService.title;

        this.titleService.changeTitle.subscribe((title: string) => {
            this.title = title;
        });
    }

    // handleChannelChange(event: string) {
    //     // console.log(event);
    //     this.pageTitle = event;
    // }



}
