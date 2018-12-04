import {
    API_KEY,
    COUNTRY,
    LANGUAGE,
    NEWS_API_URL,
    SOURCES_ENDPOINT,
} from '../config';

import handleErrors from "../utils/handleErrors";

class ChannelsRepo {

    async getList() {
        const urlForSources = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;
        const result = await ChannelsRepo.loadData(urlForSources);
        const channelsList = result ? result.sources : [];
        return channelsList;
    }

    static loadData(url = '') {
        const req = new Request(url);

        return fetch(req)
            .then(handleErrors)
            .catch(error => console.log(error));
    };

}

const ChannelsRepoInstanse = new ChannelsRepo();

export default ChannelsRepoInstanse;
