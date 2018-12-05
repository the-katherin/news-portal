import '../styles/app.scss';

import store from './redux/store';

import NewsPortalContainer from './components/NewsPortalContainer';

export default () => {
    const newsPortal = new NewsPortalContainer(store);
    newsPortal.init();
};


