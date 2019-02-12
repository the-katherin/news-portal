import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddArticleComponent } from './add-article/add-article.component';
import {SingleArticleViewComponent} from './single-article-view/single-article-view.component';
import {EditArticleComponent} from './edit-article/edit-article.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'add', component: AddArticleComponent },
    { path: 'articles/:id', component: SingleArticleViewComponent},
    { path: 'edit/:id', component: EditArticleComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
