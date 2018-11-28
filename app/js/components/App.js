export default class App {
    constructor() {
        this.showNewsPortalButton = document.getElementById('show-news-portal-button');
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

        this.showNewsPortalButton.classList.add('show-news-portal-button--hidden');
        this.mainContentWrapper.classList.remove('main-content-wrapper--hidden');
    };

    init() {
        this.addEventListeners();
    }

}
