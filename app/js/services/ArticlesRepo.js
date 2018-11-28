import {
    API_KEY,
    LANGUAGE,
    NEWS_API_URL,
    NEWS_ENDPOINT,
    PAGE_SIZE,
} from '../config';

class ArticlesRepo {

    async getList(newsChannel = '') {
        const url = `${NEWS_API_URL}${NEWS_ENDPOINT}q=news&sources=${newsChannel}&language=${LANGUAGE}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
        const { articles } = await ArticlesRepo.loadData(url);
        return articles;
    }

    static loadData(url = '') {
        const req = new Request(url);

        return fetch(req)
            .then(response => response.json())
            .catch(error => console.log(error));
    };

}

const ArticlesRepoInstanse = new ArticlesRepo();

export default ArticlesRepoInstanse;
