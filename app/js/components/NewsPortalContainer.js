import ChannelsList from './ChannelsList';
import ArticlesList from './ArticlesList';
import { switchToArticlesView, switchToChannelsView } from "../redux/actions";

export default class NewsPortalContainer {
    constructor(store) {
        this.channelsContainer = document.getElementById('channels-list');
        this.chooseChannelButton = document.getElementById('choose-channel-button');
        this.channelsComponent = new ChannelsList();
        this.articlesComponent = new ArticlesList(store);
        this.changeMainView = this.changeMainView.bind(this);
        this.store = store;
        this.store.subscribe(this.changeMainView);
    }

    addEventListeners() {
        this.chooseChannelButton.addEventListener('click', this.onChooseChannelButtonClick.bind(this));
        this.channelsContainer.addEventListener('click', this.onChannelChoose.bind(this));
    }

    changeMainView() {
        const {mainViewMode} = this.store.getState();
        const mainContainer = document.getElementById('main-container');

        if(mainViewMode === 'channels' && mainContainer.classList.contains('main--hide-channels')) {
            mainContainer.classList.remove('main--hide-channels');
        } else if (mainViewMode === 'articles' && !mainContainer.classList.contains('main--hide-channels')){
            mainContainer.classList.add('main--hide-channels');
        }
    }

    onChooseChannelButtonClick(e) {
        scrollTo(0, 0);
        this.store.dispatch(switchToChannelsView);
    }

    onChannelChoose(e) {
        const newsContainer = document.getElementById('news-list');
        const { target } = e;
        const channelId = target.id || target.parentElement.id;

        if (channelId && channelId !== 'channels-list') {
            this.store.dispatch(switchToArticlesView(channelId));
            scrollTo(0, 0);
        }
    }

    async init() {
        await this.channelsComponent.render(this.channelsContainer);
        this.addEventListeners();
    }

}
