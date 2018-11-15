import NewsRepo from './NewsRepo';

export default class App {
    constructor() {
        this.channelsContainer = document.getElementById('channels-list');
        this.chooseChannelButton = document.getElementById('choose-channel-button');
    }

    addEventListeners() {
        this.chooseChannelButton.addEventListener('click', this.onChooseChannelButtonClick);
        this.channelsContainer.addEventListener('click', this.onChannelChoose.bind(this));
    }


    async onChannelChoose(e) {

        const mainContainer = document.getElementById('main-container');
        const { target } = e;
        const channelId = target.id || target.parentElement.id;

        if (channelId) {
            await NewsRepo.getArticles(channelId);
            const { articles } = NewsRepo;
            this.renderArticles(articles);
            mainContainer.classList.add('main--hide-channels');
            scrollTo(0, 0);
        }
    }

    onChooseChannelButtonClick(e) {
        scrollTo(0, 0);
        const mainContainer = document.getElementById('main-container');

        if (mainContainer.classList.contains('main--hide-channels')) {
            mainContainer.classList.remove('main--hide-channels');
        };
    }

    renderChannels(channels = []) {
        channels.map(channel => {
            const {
                category = '',
                description = '',
                id = '',
                name = '',
                url = '',
            } = channel;

            const channelItem = document.createElement('div');
            channelItem.classList.add('channel');
            channelItem.setAttribute('id', `${id}`);

            channelItem.innerHTML =
                `
                <h3 class="channel__name">${name}</h3>
                <span class='channel__category'>${category}</span>
                <p class="channel__description">${description}</p>
                 <a href=${url} target='_blank' class="channel__link">Link</a>
            `
            this.channelsContainer.appendChild(channelItem);

        });
    }

    renderArticles(articles = []) {
        const newsContainer = document.getElementById('news-list');
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
            newsItem.classList.add('news-list__item', 'news');


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

            newsContainer.appendChild(newsItem);

        });
    }

    async init() {
        await NewsRepo.getChannels();
        const { channels } = NewsRepo;
        this.renderChannels(channels);
        this.addEventListeners();
    }

}
