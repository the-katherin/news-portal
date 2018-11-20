import {
    API_KEY,
    COUNTRY,
    LANGUAGE,
    NEWS_API_URL,
    SOURCES_ENDPOINT,
} from '../config';

import loadData from '../utils/loadData';

class ChannelsRepo {
    constructor() {
        this._channels = [];
    }

    async getList() {
        const urlForSources = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;
        const { sources } = await loadData(urlForSources);
        this._channels = sources;
        return this._channels;
    }

}

const ChannelsRepoInstanse = new ChannelsRepo();

export default ChannelsRepoInstanse;
