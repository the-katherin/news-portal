import './styles/main.scss';

// todo rename to main js

import NewsService, { urlForEverything, urlForSources, getData } from './js/newsApiService';

const doc = document;
const newsContainer = doc.getElementById('news-list');
const channelsContainer = doc.getElementById('channels-list');
const chooseChannelButton = doc.getElementById('choose-channel-button');
const CHANNELS_LIST_POSITION_Y = 40;
const append = (parent, el) => parent.appendChild(el);
const createNode = element => doc.createElement(element);



const newsServiceInstance = new NewsService();
newsServiceInstance.getChannels();
//console.log(newsServiceInstance.channels);





const onChooseChannelButtonClick = e => {
    scrollTo(0, CHANNELS_LIST_POSITION_Y);
    channelsContainer.classList.toggle('channels-list--show');
    console.log('clicked');
};

const onChooseChannel = e => {
    const { target } = e;
    const channelId = target.id || target.parentElement.id;
    console.log(target.id);
    console.log(target.parentElement.id); //
    console.log(channelId);
};

const renderChannels = channels => {
    channels.map(channel => {
        const {
            category,
            description,
            id,
            name,
            url,
        } = channel;

        const channelItem = createNode('div');
        channelItem.classList.add('channel');
        channelItem.setAttribute('id', `${id}`);

        channelItem.innerHTML =
            `
                <h3 class="channel__name">${name}</h3>
                <span class='channel__category'>${category}</span>
                <p class="channel__description">${description}</p>
                 <a href=${url} target='_blank'>Link</a>
            `
        append(channelsContainer, channelItem);

    });
};


chooseChannelButton.addEventListener('click', onChooseChannelButtonClick);

channelsContainer.addEventListener('click', onChooseChannel);



const insertArticles = articles => {
    articles.map(article => {
        const {
            author,
            content,
            description,
            publishedAt,
            source, //todo name //id
            title,
            url,
            urlToImage,
        } = article;

        const newsItem = createNode('div');
        newsItem.classList.add('news-list__item', 'news');

        const image = createNode('img'); //todo move to inner html
        image.classList.add('news__image');
        image.src = urlToImage;

        const newsItemContent = createNode('div');
        newsItemContent.classList.add('news__content');

        newsItemContent.innerHTML =
            `
            <h2 class='news-title'>
                <a href=${url} target='_blank'>${title}</a>
            </h2>
            <p class='news-description'>${description}</p>
            <p classs='news-author'>Author: ${author}</p>
            <div class='news-info'> 
                <span class='news-date'>${new Date(publishedAt).toUTCString()} | </span>
                <span className="news-source">${source.name}</span>
            </div>
            `;



        append(newsItem, image);
        append(newsItem, newsItemContent);
        append(newsContainer, newsItem);

    });
}

// todo split to different functions or move to service repo
async function loadNews() {
    const { articles } = await getData(urlForEverything);
    insertArticles(articles);
    console.log(articles);
    console.log('done');
}

async function loadSources() {
    const { sources } = await getData(urlForSources);
    renderChannels(sources);
    console.log(sources);
    console.log('done');
    // parseDate();
}

loadNews();

loadSources();






