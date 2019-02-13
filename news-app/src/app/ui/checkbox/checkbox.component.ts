import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    @Input() checkBoxLabel: string;
    @Output() check: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onCheck(e) {
        this.check.emit(e.target.checked);
    }

}
