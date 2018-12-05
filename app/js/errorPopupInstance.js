import '../styles/error-popup.scss';

import store from './redux/store';

import ErrorPopup from './components/ErrorPopup';

export default () => {
    return new ErrorPopup(store);
};

