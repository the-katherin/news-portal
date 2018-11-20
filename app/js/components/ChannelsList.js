import ChannelsRepo from '../services/ChannelsRepo';

export default class ChannelsList {

    async render(channelsContainer) {
        const channels = await ChannelsRepo.getList();
        const channelsElements = [];
        channels.map(channel => {
            const {
                category = '',
                description = '',
                id = '',
                name = '',
                url = '',
            } = channel;

            const channelItem = document.createElement('div');
            channelItem.classList.add('channel');
            channelItem.setAttribute('id', `${id}`);

            channelItem.innerHTML =
                `
                <h3 class="channel__name">${name}</h3>
                <span class='channel__category'>${category}</span>
                <p class="channel__description">${description}</p>
                 <a href=${url} target='_blank' class="channel__link">Link</a>
            `
            channelsElements.push(channelItem);
        });

        channelsElements.forEach(channel => channelsContainer.appendChild(channel));
    }

}
