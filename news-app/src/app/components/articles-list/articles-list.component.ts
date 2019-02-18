import { Component, OnInit, Input } from '@angular/core';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

    @Input() articles: object;
    @Input() renderEditButtons: boolean;

    public keyword: string;

    constructor(  private filterService: FilterService) {
        this.keyword = '';
    }

    ngOnInit() {
        this.filterService.changeKeyword.subscribe((keyword: string) => {
            this.keyword = keyword;
        });
    }

}
