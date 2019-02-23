const API_KEY = '02e8d88534de4f6abb6c90514e95aaea';
const COUNTRY = 'us';
const LANGUAGE = 'en';
const NEWS_API_URL = 'https://newsapi.org/v2/';
const NEWS_ENDPOINT = 'everything?';
const SOURCES_ENDPOINT = 'sources?';

const MY_ARTICLES_ENDPOINT = 'https://kate-news-db.herokuapp.com/news';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

const CHANNELS_URL = `${NEWS_API_URL}${SOURCES_ENDPOINT}language=${LANGUAGE}&country=${COUNTRY}&apiKey=${API_KEY}`;

export {
    API_KEY,
    CHANNELS_URL,
    COUNTRY,
    DEFAULT_HEADERS,
    LANGUAGE,
    MY_ARTICLES_ENDPOINT,
    NEWS_API_URL,
    NEWS_ENDPOINT,
    SOURCES_ENDPOINT,
};

