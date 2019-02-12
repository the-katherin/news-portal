import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddArticleComponent } from './add-article/add-article.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'add', component: AddArticleComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
