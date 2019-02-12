import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
    selector: 'article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

    public headingControl: FormControl = new FormControl('', Validators.required);
    public shortDescriptionControl: FormControl = new FormControl('', Validators.required);
    public contentControl: FormControl = new FormControl('', Validators.required);
    public imgTypeControl: FormControl = new FormControl('');
    public imgUrlControl: FormControl = new FormControl('');
    public dateControl: FormControl = new FormControl('', Validators.required);
    public authorControl: FormControl = new FormControl('', Validators.required);
    public sourceControl: FormControl = new FormControl('', Validators.required);
    // public sendEmailsControl: FormControl = new FormControl();
    public isDisabled: boolean;
    public articleFormGroup: FormGroup;
    // public fullData: string;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.buildForm();
        this.isDisabled = true;
        // this.userNameControl.setValue('John');
        // this.emailControl.setValue('test@email.com');
        // this.lastnameControl.setValue('NN');


        this.articleFormGroup.valueChanges.subscribe((data) => {
            this.isDisabled = !this.articleFormGroup.valid;

            // console.log(this.userFormGroup);
        })
        //this.userFormGroup.
    }

    public buildForm(): void {
        this.articleFormGroup = this.fb.group({
            heading: this.headingControl,
            shortDescription: this.shortDescriptionControl,
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
        console.log(this.articleFormGroup.value);

    }

}
