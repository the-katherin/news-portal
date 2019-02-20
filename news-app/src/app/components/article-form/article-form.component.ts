import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MyArticlesService} from '../../services/my-articles.service';

@Component({
    selector: 'article-form',
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

    @Input() article: {
        urlToImage: string,
        title: string,
        id: number,
        description: string,
        author: string,
        publishedAt: string,
        source: string,
    };

    @Input() isEditMode: boolean;
    @Input() articleId: string;

    public headingControl: FormControl = new FormControl('', Validators.required);
    public contentControl: FormControl = new FormControl('', Validators.required);
    public imgTypeControl: FormControl = new FormControl('');
    public imgUrlControl: FormControl = new FormControl('');
    public dateControl: FormControl = new FormControl('', Validators.required);
    public authorControl: FormControl = new FormControl('', Validators.required);
    public sourceControl: FormControl = new FormControl('', Validators.required);
    public isDisabled: boolean;
    public articleFormGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private myArticlesService: MyArticlesService,
        private router: Router,
    ) { }

    ngOnInit() {


        if (this.article) {
            this.headingControl.setValue(this.article.title);
            this.contentControl.setValue(this.article.description);
            this.imgUrlControl.setValue(this.article.urlToImage);
            this.imgTypeControl.setValue(this.article.urlToImage ? "image" : null);
            this.dateControl.setValue(this.article.publishedAt);
            this.authorControl.setValue(this.article.author);
            this.sourceControl.setValue(this.article.source);

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
            title: this.headingControl,
            description: this.contentControl,
            imgType: this.imgTypeControl,
            urlToImage: this.imgUrlControl,
            publishedAt: this.dateControl,
            author: this.authorControl,
            source: this.sourceControl,
        });
    }

    public onSubmit(): void {
        const newArticle = this.articleFormGroup.value;

        if (this.articleFormGroup.valid) {
           this.isEditMode ? this.editArticle(newArticle) : this.addArticle(newArticle);
        }

    }

    addArticle(newArticle) {
        this.myArticlesService.addArticle(newArticle).subscribe(
            () => {
                alert('Successfully saved');
                this.router.navigate(['/']);
            },
            (error) => console.log('error here:', error)
        );
    }

    editArticle(newArticle) {
        this.myArticlesService.editArticle(newArticle, this.articleId).subscribe(
            () => {
                alert('Successfully updated');
                this.router.navigate(['/']);
            },
            (error) => console.log('error here:', error)
        );
    }

}
