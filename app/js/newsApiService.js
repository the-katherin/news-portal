const myApiKey = '02e8d88534de4f6abb6c90514e95aaea';
const pageSize = 10;
const newsApiUrl = 'https://newsapi.org/v2/';
const endpointForEverything = 'everything?';
const endpointForSources = 'sources?';
const country = 'us'; // todo ? delete
const language = 'en';

const urlForEverything = `${newsApiUrl}${endpointForEverything}q=news&language=${language}&pageSize=${pageSize}&apiKey=${myApiKey}`;

const urlForSources = `${newsApiUrl}${endpointForSources}language=${language}&country=${country}&apiKey=${myApiKey}`;

async function getData(url) {

    const req = new Request(url);

    return fetch(req)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export { urlForEverything, urlForSources, getData };
