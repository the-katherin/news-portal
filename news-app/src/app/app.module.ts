import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginControlsComponent } from './login-controls/login-controls.component';
import { MainComponent } from './main/main.component';
import { ControlsPanelComponent } from './controls-panel/controls-panel.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { SingleArticleViewComponent } from './single-article-view/single-article-view.component';
import { EditArticleComponent } from './edit-article/edit-article.component';


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
        EditArticleComponent
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
