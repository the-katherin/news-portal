import {
    ARTICLES_VIEW,
    CHANNELS_VIEW,
    ERROR_VIEW,
    MAIN_VIEW,
} from './constants';

const switchToMainViewMode = {
    type: MAIN_VIEW,
};

const switchToChannelsView = {
    type: CHANNELS_VIEW,
};

const switchToErrorView = error => ({
    type: ERROR_VIEW,
    payload: error,
});

const switchToArticlesView = newsChannel => ({
    type: ARTICLES_VIEW,
    payload: newsChannel,
});

export {
    switchToMainViewMode,
    switchToArticlesView,
    switchToChannelsView,
    switchToErrorView,
};