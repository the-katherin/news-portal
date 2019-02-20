import {Component, OnInit} from '@angular/core';
import { TitleService } from '../../services/title.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public title: string;

    constructor(
        private router: Router,
        private titleService: TitleService,
    ) { }

    ngOnInit() {
        this.title = this.titleService.title;

        this.titleService.changeTitle.subscribe((title: string) => {
            this.title = title;
        });
    }
}
