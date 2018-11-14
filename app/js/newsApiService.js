const API_KEY = '02e8d88534de4f6abb6c90514e95aaea';
const pageSize = 10;
const newsApiUrl = 'https://newsapi.org/v2/';
const endpointForEverything = 'everything?';
const endpointForSources = 'sources?';
const country = 'us'; // todo ? delete
const language = 'en';

// todo rename
// todo разнести константы
// todo delete
const urlForEverything = `${newsApiUrl}${endpointForEverything}q=news&language=${language}&pageSize=${pageSize}&apiKey=${API_KEY}`;

const urlForSources = `${newsApiUrl}${endpointForSources}language=${language}&country=${country}&apiKey=${API_KEY}`;

function getData(url) {

    const req = new Request(url);

    return fetch(req)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export { urlForEverything, urlForSources, getData };

export default class NewsService  {
    constructor () {
        this._articles = [];
        this._channels = [];
        // this.currentChannel = '';
        // todo ? this.urlForSources
    }

    _loadData(url) { // todo check if async needed
        const req = new Request(url);

        return fetch(req)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    async getChannels() {
        const { sources } = await this._loadData(urlForSources);
        this._channels = sources;
        console.log(this._channels);
    }

    async getArticles(source) {
        // this.currentChannel
        const url = `${newsApiUrl}${endpointForEverything}q=news&sources=${source}&language=${language}&pageSize=${pageSize}&apiKey=${API_KEY}`;
        const { articles } = await this._loadData(url);
        this._articles = articles;
    }

    get channels () {
        return this._channels;
    }

    get articles () {
        return this._articles;
    }

    // init() {
    //     this._getChannels(); // todo ? async await
    // }



}
