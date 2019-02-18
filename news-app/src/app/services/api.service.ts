import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {
    API_KEY,
    COUNTRY,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT,
    SOURCES_ENDPOINT,
} from '../apiConfig';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getChannelsList() {
        const urlForSources = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;

        return this.http.get<any>(urlForSources) // todo interface
            .pipe(
                map((response: any) => { // todo interface
                    console.log('response', response);

                    return response.sources || [];
                })
            );
    }

    getArticles(channel) {
        const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${channel}&language=${LANGUAGE}&apiKey=${API_KEY}`;

        return this.http.get<any>(url)// todo interface
            .pipe(
                map((response: any) => {
                    console.log('response', response);

                    return response.articles || [];
                })
            );
    }

    getMyArticles() {
        const url = `https://kate-news-db.herokuapp.com/news`;

        return this.http.get<any>(url) // todo interface
        // .pipe(
        //     map((response: any) => {
        //         console.log('response', response);

        //         return response || [];
        //     })
        // );
    }
    // const result = await ChannelsRepo.loadData(urlForSources);
    // const channelsList = result ? result.sources : [];
    // return channelsList;

    // getNews(){
    //     return this.http.get<any>('https://newsapi.org/v1/articles?source=bbc-news&apiKey=554109c975e14549b32eb8b2f41fe8f8')
    //         .pipe(
    //             map((response: any) => {
    //                 console.log('response', response);
    //                 // const data = response.json();
    //                 return response.articles;
    //             })
    //         );
    // }

    // storeArticles(articles: any[]){
    //     console.log(articles);
    //     return this.http.put('https://angular-test-91dc6.firebaseio.com/data.json', articles);
    // }
}
