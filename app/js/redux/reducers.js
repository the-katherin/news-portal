import { combineReducers } from 'redux';

import {
    ARTICLES_VIEW,
    CHANNELS_VIEW,
    ERROR_VIEW,
    INITIAL_VIEW,
    MAIN_VIEW,
} from './constants';

const initialState = {
    newsChannel: '',
    viewMode: 'initial',
    mainViewMode: 'channels',
    error: '',
};

const error = (state = initialState.error, action) => {
    switch(action.type) {

        case ERROR_VIEW:
            return action.payload;

        default:
            return state;
    }
};

const newsChannel = (state = initialState.newsChannel, action) => {
    switch(action.type) {

        case ARTICLES_VIEW:
            return action.payload;

        default:
            return state;
    }
};

const viewMode = (state = initialState.viewMode, action) => {
    switch(action.type) {

        case INITIAL_VIEW:
            return  'initial';

        case MAIN_VIEW:
            return 'main';

        case ERROR_VIEW:
            return 'error';

        default:
            return state;
    }
};

const mainViewMode = (state = initialState.mainViewMode, action) => {
    switch(action.type) {

        case ARTICLES_VIEW:
            return 'articles';

        case CHANNELS_VIEW:
            return 'channels';

        default:
            return state;
    }
};

const reducer = combineReducers({
    newsChannel,
    error,
    mainViewMode,
    viewMode,
});

export default reducer;
