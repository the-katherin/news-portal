import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

    @Input() articles: object;
    @Input() renderEditButtons: boolean;

    constructor() { }

    ngOnInit() {
    }

}
