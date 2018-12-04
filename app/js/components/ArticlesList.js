import ArticlesRepo from '../services/ArticlesRepo';

export default class ArticlesList {
    constructor() {
        this._articles = [];
    }

    async getListData(newsChannel) {
        this._articles = await ArticlesRepo.getList(newsChannel);
    }

    static getListMarkup(articles = []) {
        let articlesElements = '';

        articles.map(article => {
            const {
                author = 'not specified',
                description = '',
                publishedAt = 'not specified',
                source: { name },
                title = 'Title',
                url = '',
                urlToImage = '',
            } = article;

            articlesElements +=
                `
                <div class="news-list__item news">
                    <img class='news__image' src=${urlToImage || ''}>
                    <div className="news__content"> 
                        <h2 class='news-title'>
                                <a href=${url} target='_blank'>${title}</a>
                        </h2>
                        <p class='news-description'>${description}</p>
                        <p classs='news-author'>${author || ''}</p>
                        <div class='news-info'> 
                            <span class='news-date'>${new Date(publishedAt).toUTCString()} | </span>
                            <span className="news-source">${name}</span>
                        </div>
                    </div>
                </div>
            `
        });

        return articlesElements;
    }

    async render(newsChannel = '', newsContainer) {
        await this.getListData(newsChannel);
        const newsMarkup = ArticlesList.getListMarkup(this._articles);
        newsContainer.innerHTML = newsMarkup;
    }

}
