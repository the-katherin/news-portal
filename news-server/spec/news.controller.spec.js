const endpoint = 'http://localhost:3000/news';
const newsLength = 3;

const firstNews = {
    _id: '5c69b8261c9d44000015a0dc',
    author: 'me',
    description: 'velit accusamus at debitis alias commodi temporibus dicta doloribus, ut labore perspiciatis aut animi quidem, nulla sint libero omnis facere accusantium voluptatum quasi voluptate maxime totam. Ducimus, quisquam dolorem?',
    title: 'Lorem ipsum ipsum lorem',
    publishedAt: '2019-01-01T21:00:00.000Z',
    urlToImage: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/169F6/production/_91026629_gettyimages-519508400.jpg',
    source: 'source',
    imgType: 'image'
};

const stubNewArticle = {
    author: 'me',
    description: 'Accusamus at debitis alias commodi temporibus dicta doloribus, ut labore perspiciatis aut animi quidem, nulla sint libero omnis facere accusantium voluptatum quasi voluptate maxime totam. Ducimus, quisquam dolorem?',
    title: 'Lorem ipsum',
    publishedAt: '2019-01-01T21:00:00.000Z',
    urlToImage: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/169F6/production/_91026629_gettyimages-519508400.jpg',
    source: 'source',
    imgType: 'image'
};

const stubUpdatedArticle = {
    author: 'updated',
    description: 'Updated Accusamus at debitis alias commodi temporibus dicta doloribus, ut labore perspiciatis aut animi quidem, nulla sint libero omnis facere accusantium voluptatum quasi voluptate maxime totam. Ducimus, quisquam dolorem?',
    title: 'Lorem ipsum updated',
    publishedAt: '2019-02-01T21:00:00.000Z',
    urlToImage: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/169F6/production/_91026629_gettyimages-519508400.jpg',
    source: 'updated source',
    imgType: 'updated image'
};

const request = require('request');

const {
    GetNews,
    GetNewsById,
    CreateNews,
    UpdateNews,
    DeleteNews,
} = require('../controllers/news.controller');

describe('newsController', () => {
    let newArticleId;

    describe('GetNews', () => {
        it('should return news with 200 response code', function (done) {
            request.get(endpoint, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();

                const news = JSON.parse(response.body);
                expect(news.length).toBe(newsLength);
                expect(news).toContain(firstNews);
                done();
            });
        });
    });

    describe('GetNewsById', () => {
        it('should return news by id 200 response code', function (done) {
            request.get(`${endpoint}/${firstNews._id}`, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();

                done();
            });
        });

        it('should return response if wrong id', function (done) {
            request.get(`${endpoint}/555`, function (error, response) {
                expect(response.statusCode).not.toEqual(200);
                expect(response.body).toBeTruthy();
                done();
            });
        });
    });

    describe('CreateNews', () => {
        it('should return new article with 200 response code', function (done) {
            request.post(endpoint, {form: stubNewArticle}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();

                const article = JSON.parse(response.body);

                newArticleId = article._id;

                expect(article.description).toEqual(stubNewArticle.description);

                done();
            });
        });
    });

    describe('UpdateNews', () => {
        it('should return news by id 200 response code', function (done) {
            request.put(`${endpoint}/${newArticleId}`, {form: stubUpdatedArticle}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();
            })
                .pipe(
                    request.get(endpoint, function (error, response) {
                        expect(response.statusCode).toEqual(200);
                        expect(response.body).toBeTruthy();

                        const news = JSON.parse(response.body);

                        expect(news.length).toBe(newsLength + 1);
                        expect(news[newsLength].description).toBe(stubUpdatedArticle.description);

                        done();
                    }));
        });
    });

    describe('DeleteNews', () => {
        it('should delete news by id with 200 response code', function (done) {
            console.log(newArticleId);
            request.delete(`${endpoint}/${newArticleId}`, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();
            })
                .pipe(
                    request.get(endpoint, function (error, response) {
                        expect(response.statusCode).toEqual(200);
                        expect(response.body).toBeTruthy();

                        const news = JSON.parse(response.body);

                        expect(news.length).toBe(newsLength);

                        done();
                    }));
        });
    });
});



