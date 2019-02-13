import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import {SingleArticleViewComponent} from './pages/single-article-view/single-article-view.component';
import {EditArticleComponent} from './pages/edit-article/edit-article.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'articles-add', component: AddArticleComponent },
    { path: 'articles/:id', component: SingleArticleViewComponent},
    { path: 'articles-edit/:id', component: EditArticleComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
