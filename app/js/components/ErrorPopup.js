export default class ErrorPopup {
    constructor() {
        if(! ErrorPopup.instance){
            ErrorPopup.instance = this;
        }
        return ErrorPopup.instance;
    }

    addEventListeners() {
        const errorPopupButton = document.getElementById('error-popup-button');
        errorPopupButton.addEventListener('click', this.onErrorPopupButtonClick.bind(this));
    }

    onErrorPopupButtonClick(e) {
        const errorPopupContainer = document.getElementById('error-popup-container');
        const mainContent = document.getElementById('main-container');

        errorPopupContainer.classList.add('error-popup-container--hidden');
        mainContent.classList.remove('main--hidden');
    };

    showErrorPopup() {
        const errorPopupContainer = document.getElementById('error-popup-container');
        const mainContent = document.getElementById('main-container');

        mainContent.classList.add('main--hidden');
        errorPopupContainer.classList.remove('error-popup-container--hidden');
    }

    render(error) {
        const errorPopupTextElement = document.getElementById('error-popup-text');
        errorPopupTextElement.innerText = error;

        this.showErrorPopup();
    }

    init() {
        this.addEventListeners();
    }

}
