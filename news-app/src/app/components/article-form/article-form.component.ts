import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

    @Input() article: {
        url: string,
        title: string,
        id: number,
        description: string,
        author: string,
        publishedAt: string,
        sourceName: string,
    };

    public headingControl: FormControl = new FormControl('', Validators.required);
    public contentControl: FormControl = new FormControl('', Validators.required);
    public imgTypeControl: FormControl = new FormControl('');
    public imgUrlControl: FormControl = new FormControl('');
    public dateControl: FormControl = new FormControl('', Validators.required);
    public authorControl: FormControl = new FormControl('', Validators.required);
    public sourceControl: FormControl = new FormControl('', Validators.required);
    public isDisabled: boolean;
    public articleFormGroup: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        if (this.article) {
            this.headingControl.setValue(this.article.title);
            this.contentControl.setValue(this.article.description);
            this.imgUrlControl.setValue(this.article.url);
            this.dateControl.setValue(this.article.publishedAt);
            this.authorControl.setValue(this.article.author);
            this.sourceControl.setValue(this.article.sourceName);

            this.isDisabled = false;
        } else {
            this.isDisabled = true;
        }

        this.buildForm();


        this.articleFormGroup.valueChanges.subscribe((data) => {
            this.isDisabled = !this.articleFormGroup.valid;
        });
    }

    public buildForm(): void {
        this.articleFormGroup = this.fb.group({
            heading: this.headingControl,
            content: this.contentControl,
            imgType: this.imgTypeControl,
            imgUrl: this.imgUrlControl,
            date: this.dateControl,
            author: this.authorControl,
            source: this.sourceControl,
        })
    }

    public onSubmit(): void {
        console.log('Saved');
    }

}
