import '../styles/app.scss';

import NewsPortalContainer from './components/NewsPortalContainer';

export default () => {
    const newsPortal = new NewsPortalContainer();
    newsPortal.init();
};


