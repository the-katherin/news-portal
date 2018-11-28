import {
    API_KEY,
    COUNTRY,
    LANGUAGE,
    NEWS_API_URL,
    SOURCES_ENDPOINT,
} from '../config';

class ChannelsRepo {

    async getList() {
        const urlForSources = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;
        const { sources } = await ChannelsRepo.loadData(urlForSources);
        return sources;
    }

    static loadData(url = '') {
        const req = new Request(url);

        return fetch(req)
            .then(response => response.json())
            .catch(error => console.log(error));
    };

}

const ChannelsRepoInstanse = new ChannelsRepo();

export default ChannelsRepoInstanse;
