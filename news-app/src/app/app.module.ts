import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginControlsComponent } from './components/login-controls/login-controls.component';
import { MainComponent } from './pages/main/main.component';
import { ControlsPanelComponent } from './components/controls-panel/controls-panel.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { ArticleComponent } from './components/article/article.component';
import { SingleArticleViewComponent } from './pages/single-article-view/single-article-view.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { SelectComponent } from './ui/select/select.component';
import { InputComponent } from './ui/input/input.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        LoginControlsComponent,
        MainComponent,
        ControlsPanelComponent,
        AddArticleComponent,
        ArticleFormComponent,
        ArticleComponent,
        SingleArticleViewComponent,
        EditArticleComponent,
        SelectComponent,
        InputComponent,
        CheckboxComponent,
        ArticlesListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
