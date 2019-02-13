import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

    constructor(private titleService: TitleService) { }

    ngOnInit() {
        this.titleService.onChangeTitle('Add Article');
    }

}
