import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import articleStub from '../../mocks/articleMock';

import { ArticleFormComponent } from './article-form.component';
import { FormBuilder } from '@angular/forms';
import {MyArticlesService} from '../../services/my-articles.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from "rxjs";

describe('ArticleFormComponent', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;
  const myArticlesServiceSpy = jasmine.createSpyObj('MyArticlesService', ['addArticle', 'editArticle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        schemas: [ NO_ERRORS_SCHEMA ],
        declarations: [ ArticleFormComponent ],
        providers: [
            FormBuilder,
            { provide: MyArticlesService, useValue: myArticlesServiceSpy},
        ],
    })
        .compileComponents();
  }));

  beforeEach(() => {
        fixture = TestBed.createComponent(ArticleFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

  it('should create', () => {
        expect(component).toBeTruthy();
      });


  describe('addArticle', () => {
      it('should invoke addArticle function from myArticlesService', () => {

          myArticlesServiceSpy.addArticle.and.returnValue(of({}));

          component.addArticle(articleStub);
          expect(myArticlesServiceSpy.addArticle).toHaveBeenCalled();
      });

  });

  describe('addArticle', () => {
        it('should invoke addArticle function  from myArticlesService', () => {

            myArticlesServiceSpy.editArticle.and.returnValue(of({}));

            component.editArticle(articleStub);
            expect(myArticlesServiceSpy.editArticle).toHaveBeenCalled();
        });

    });

});
