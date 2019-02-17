import { Component, Input, OnInit } from '@angular/core';
import { ShowControlsService } from '../../services/show-controls.service';
import { TitleService } from '../../services/title.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public showControls: boolean;
    public title: string;

    constructor(
        private showControlsService: ShowControlsService,
        private titleService: TitleService,
    ) { }

    ngOnInit() {
        this.showControlsService.switchControls.subscribe((isVisible: boolean) => {
            this.showControls = isVisible;
        });

        this.title = this.titleService.title;

        this.titleService.changeTitle.subscribe((title: string) => {
            this.title = title;
        });
    }
}
