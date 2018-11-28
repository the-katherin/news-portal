export default class App {
    constructor() {
        this.showNewsPortalButton = document.getElementById('show-news-portal-button');
        this.showNewsButtonContainer = document.getElementById('show-news-button-container');
        this.mainContentWrapper = document.getElementById('main-content-wrapper');
    }

    addEventListeners() {
        this.showNewsPortalButton.addEventListener('click', this.onShowNewsPortalButtonClick.bind(this));
    }

    async onShowNewsPortalButtonClick(e) {
        await import(/* webpackChunkName: "main" */ '../main').then(module => {
            const initNewsPortal = module.default;

            initNewsPortal();
        });

        this.showNewsButtonContainer.classList.add('show-news-button-container--hidden');
        this.mainContentWrapper.classList.remove('main-content-wrapper--hidden');
    };

    init() {
        this.addEventListeners();
    }

}
