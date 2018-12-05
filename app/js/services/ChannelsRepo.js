import {
    API_KEY,
    COUNTRY,
    LANGUAGE,
    NEWS_API_URL,
    SOURCES_ENDPOINT,
} from '../config';

import RequestsProxy from "../utils/requestsProxy";

class ChannelsRepo {

    async getList() {
        const urlForSources = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;
        const result = await ChannelsRepo.loadData(urlForSources);
        const channelsList = result ? result.sources : [];
        return channelsList;
    }

    static loadData(url = '') {
        const request = new RequestsProxy(url, 'get');
        return request.send();
    };

}

const ChannelsRepoInstanse = new ChannelsRepo();

export default ChannelsRepoInstanse;
