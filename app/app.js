import './styles/main.scss';

import getNews from './js/newsApiService'

async function loadNews () {
    const {articles} = await getNews();
    console.log(articles);
    console.log('done');
}

loadNews();

// var url = 'https://newsapi.org/v2/top-headlines?' +
//     'country=us&' +
//     'apiKey=02e8d88534de4f6abb6c90514e95aaea';
// var req = new Request(url);

// fetch(req)
//     .then(response => {
//         console.log(response.json())}
//     );

// fetch(req)
//     .then(response => {
//         console.log(response.json());
//     });



console.log('work');
