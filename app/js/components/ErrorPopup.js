import {switchToMainViewMode} from "../redux/actions";

export default class ErrorPopup {
    constructor(store) {
        if(! ErrorPopup.instance){
            ErrorPopup.instance = this;
            this.render = this.render.bind(this);
            this.store = store;
            this.store.subscribe(this.render);
            this.init();
        }
        return ErrorPopup.instance;
    }

    addEventListeners() {
        const errorPopupButton = document.getElementById('error-popup-button');
        errorPopupButton.addEventListener('click', this.onErrorPopupButtonClick.bind(this));
    }

    onErrorPopupButtonClick(e) {
        this.store.dispatch(switchToMainViewMode);
    };

    render() {
        const {viewMode} = this.store.getState();

        if(viewMode === 'error'){
            const {error} = this.store.getState();
            const errorPopupTextElement = document.getElementById('error-popup-text');
            errorPopupTextElement.innerText = error;
        }
    }

    init() {
        this.addEventListeners();
    }

}
