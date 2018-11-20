import ChannelsList from './ChannelsList';
import ArticlesList from './ArticlesList';

export default class App {
    constructor() {
        this.channelsContainer = document.getElementById('channels-list');
        this.chooseChannelButton = document.getElementById('choose-channel-button');
        this.channelsComponent = new ChannelsList();
        this.articlesComponent = new ArticlesList();
    }

    addEventListeners() {
        this.chooseChannelButton.addEventListener('click', this.onChooseChannelButtonClick);
        this.channelsContainer.addEventListener('click', this.onChannelChoose.bind(this));
    }

    onChooseChannelButtonClick(e) {
        scrollTo(0, 0);
        const mainContainer = document.getElementById('main-container');

        if (mainContainer.classList.contains('main--hide-channels')) {
            mainContainer.classList.remove('main--hide-channels');
        };
    }

    async onChannelChoose(e) {
        const mainContainer = document.getElementById('main-container');
        const newsContainer = document.getElementById('news-list');
        const { target } = e;
        const channelId = target.id || target.parentElement.id;

        if (channelId && channelId !== 'channels-list') {
            await this.articlesComponent.render(channelId, newsContainer);
            mainContainer.classList.add('main--hide-channels');
            scrollTo(0, 0);
        }
    }

    async init() {
        await this.channelsComponent.render(this.channelsContainer);
        this.addEventListeners();
    }

}
