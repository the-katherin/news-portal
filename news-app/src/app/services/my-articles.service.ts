import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

import { MY_ARTICLES_ENDPOINT } from '../apiConfig';


@Injectable({
  providedIn: 'root'
})
export class MyArticlesService {

  constructor(private http: HttpClient) { }

    getMyArticles() {
        const url = MY_ARTICLES_ENDPOINT;

        return this.http.get(url);
    }

    editArticle(article, id) {
        const url = `${MY_ARTICLES_ENDPOINT}/${id}`;

        return this.http.put(url, article, httpOptions);
    }

    addArticle(article) {
        const url = `${MY_ARTICLES_ENDPOINT}`;
        return this.http.post(url, article, httpOptions);
    }

    deleteArticle(id) {
        const url = `${MY_ARTICLES_ENDPOINT}/${id}`;

        return this.http.delete(url, httpOptions);
    }
}
