import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {
    API_KEY,
    CHANNELS_URL,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT,
} from '../apiConfig';

import { GetArticlesResponse, GetChannelsResponse } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getChannelsList() {
        const urlForSources = CHANNELS_URL;

        return this.http.get(urlForSources)
            .pipe(
                map((response: GetChannelsResponse) => {
                    return response.sources || [];
                })
            );
    }

    getArticles(channel) {
        const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${channel}&language=${LANGUAGE}&apiKey=${API_KEY}`;

        return this.http.get(url)
            .pipe(
                map((response: GetArticlesResponse) => {
                    return response.articles || [];
                })
            );
    }
}
