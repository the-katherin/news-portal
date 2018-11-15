import {
    API_KEY,
    COUNTRY,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT,
    PAGE_SIZE,
    SOURCES_ENDPOINT,
} from './config';

class NewsRepo {
    constructor() {
        this._articles = [];
        this._channels = [];
    }

    _loadData(url = '') {
        const req = new Request(url);

        return fetch(req)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    async getChannels() {
        const urlForSources = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;
        const { sources } = await this._loadData(urlForSources);
        this._channels = sources;
    }

    async getArticles(source = '') {
        const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${source}&language=${LANGUAGE}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
        const { articles } = await this._loadData(url);
        this._articles = articles;
    }

    get channels() {
        return this._channels;
    }

    get articles() {
        return this._articles;
    }

}

const NewsRepoInstanse = new NewsRepo();

export default NewsRepoInstanse;
