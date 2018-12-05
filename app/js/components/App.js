import {switchToMainViewMode} from '../redux/actions';

export default class App {
    constructor(store) {
        this.changeView = this.changeView.bind(this);
        this.store = store;
        this.store.subscribe(this.changeView);
    }

    addEventListeners() {
        const showNewsPortalButton = document.getElementById('show-news-portal-button');
        showNewsPortalButton.addEventListener('click', this.onShowNewsPortalButtonClick.bind(this));
    }

    changeView() {
        const {viewMode} = this.store.getState();
        const errorPopupContainer = document.getElementById('error-popup-container');
        const mainContent = document.getElementById('main-container');
        const mainContentWrapper = document.getElementById('main-content-wrapper');
        const showNewsButtonContainer = document.getElementById('show-news-button-container');

        if (viewMode === 'main' && !showNewsButtonContainer.classList.contains('show-news-button-container--hidden')) {
            showNewsButtonContainer.classList.add('show-news-button-container--hidden');
            mainContentWrapper.classList.remove('main-content-wrapper--hidden');
        } else if (viewMode === 'main' && !errorPopupContainer.classList.contains('error-popup-container--hidden')) {
            errorPopupContainer.classList.add('error-popup-container--hidden');
            mainContent.classList.remove('main--hidden');
        } else if (viewMode === 'error') {
            mainContent.classList.add('main--hidden');
            errorPopupContainer.classList.remove('error-popup-container--hidden');
        }
    }

    async onShowNewsPortalButtonClick(e) {
        await import(/* webpackChunkName: "main" */ '../main').then(module => {
            const initNewsPortal = module.default;

            initNewsPortal();
        });

        this.store.dispatch(switchToMainViewMode);
    };

    init() {
        this.addEventListeners();
    }

}
