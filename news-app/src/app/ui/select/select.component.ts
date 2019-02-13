import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    @Input() isSelectDisabled: boolean;
    @Output() selectValue: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onSelectChange(e) {
       this.selectValue.emit(e.target.value);
    }

}
