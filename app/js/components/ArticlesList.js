import ArticlesRepo from '../services/ArticlesRepo';

export default class ArticlesList {

    async render(source = '', newsContainer) {
        const articles = await ArticlesRepo.getList(source);
        const articlesElements = [];
        newsContainer.innerHTML = "";

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

            const newsItem = document.createElement('div');
            newsItem.classList.add('news-list__item', 'news'); // IE doesn't add second class


            newsItem.innerHTML =
                `
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
            </div>`;

            articlesElements.push(newsItem);
        });

        articlesElements.forEach(article => newsContainer.appendChild(article));
    }

}
