import ChannelsRepo from '../services/ChannelsRepo';

export default class ChannelsList {

    constructor() {
        this._channels = [];
    }

    async getListData() {
        this._channels = await ChannelsRepo.getList();
    }

    static getListMarkup(channels) {
        let channelsElements = '';

        channels.map(channel => {
            const {
                category = '',
                description = '',
                id = '',
                name = '',
                url = '',
            } = channel;

            channelsElements +=
                `
                <div class="channel" id=${id}>
                    <h3 class="channel__name">${name}</h3>
                    <span class='channel__category'>${category}</span>
                    <p class="channel__description">${description}</p>
                    <a href=${url} target='_blank' class="channel__link">Link</a>
                </div>
            `
        });

        return channelsElements;
    }


    async render(channelsContainer) {
        await this.getListData();
        const channelsMarkup = ChannelsList.getListMarkup(this._channels);
        channelsContainer.innerHTML = channelsMarkup;
    }

}
