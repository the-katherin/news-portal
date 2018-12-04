import {
    API_KEY,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT,
    PAGE_SIZE,
} from '../config';

import handleErrors from '../utils/handleErrors';

class ArticlesRepo {

    async getList(newsChannel = '') {
        const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${newsChannel}&language=${LANGUAGE}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
        const result = await ArticlesRepo.loadData(url);
        const articlesList = result ? result.articles : [];
        return articlesList;
    }

    static loadData(url = '') {
        const req = new Request(url);

        return fetch(req)
            .then(handleErrors)
            .catch(error => console.log(error));
    };

}

const ArticlesRepoInstanse = new ArticlesRepo();

export default ArticlesRepoInstanse;
