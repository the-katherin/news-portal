const myApiKey = '02e8d88534de4f6abb6c90514e95aaea';
const pageSize = 10;
const newsApiUrl = 'https://newsapi.org/v2/top-headlines?';
const country = 'us';

const url = `${newsApiUrl}country=${country}&pageSize=${pageSize}&apiKey=${myApiKey}`;

var customUrl = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'pageSize=10&' +
    'apiKey=02e8d88534de4f6abb6c90514e95aaea';
const req = new Request(url);

async function getNews () {

    return fetch(req)
        .then(response => response.json() )
        .catch(error =>  console.log(error));
}

export default getNews;
