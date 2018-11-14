export default class App {
    constructor() {

    }

    onChannelChoose (e) {
        const { target } = e;
        const channelId = target.id || target.parentElement.id;
        console.log(target.id);
        console.log(target.parentElement.id); //
        console.log(channelId);
    }

    onChooseChannelButtonClick (e) {
        const CHANNELS_LIST_POSITION_Y = 40;
        scrollTo(0, CHANNELS_LIST_POSITION_Y);

        const channelsContainer = doc.getElementById('channels-list');
        channelsContainer.classList.toggle('channels-list--show');

        console.log('clicked');
    }

    renderChannels (channels) {
        channels.map(channel => {
            const {
                category,
                description,
                id,
                name,
                url,
            } = channel;

            const channelItem = createNode('div');
            channelItem.classList.add('channel');
            channelItem.setAttribute('id', `${id}`);

            channelItem.innerHTML =
                `
                <h3 class="channel__name">${name}</h3>
                <span class='channel__category'>${category}</span>
                <p class="channel__description">${description}</p>
                 <a href=${url} target='_blank'>Link</a>
            `
            append(channelsContainer, channelItem);

        });
    }

    renderArticles () {

    }

}
