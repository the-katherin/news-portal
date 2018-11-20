import {
    API_KEY,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT,
    PAGE_SIZE,
} from '../config';

import loadData from '../utils/loadData';

class ArticlesRepo {
    constructor() {
        this._articles = [];
    }

    async getList(source = '') {
        const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${source}&language=${LANGUAGE}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
        const { articles } = await loadData(url);
        this._articles = articles;
        return this._articles;
    }

}

const ArticlesRepoInstanse = new ArticlesRepo();

export default ArticlesRepoInstanse;
