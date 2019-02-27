const nock = require('nock');

const endpoint = 'http://localhost:3000/news';

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

const allNews = [firstNews];

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

    describe('GetNews', () => {

        beforeEach(() => {
            nock(endpoint)
                .get('') // should pass correct endpoint with / or without matters!
                .reply(200, allNews);
        });

        it('should return news with 200 response code', function (done) {
            request.get(endpoint, function (error, response) {

                const news = JSON.parse(response.body);

                expect(response.statusCode).toEqual(200);
                expect(news).toEqual(allNews);

                done();
            });
        });
    });

    describe('GetNewsById', () => {
        describe('GetNewsById with correct id', () => {
            beforeEach(() => {
                nock(endpoint)
                    .get(`/${firstNews._id}`) // slash at the beginning of path
                    .reply(200, firstNews);
            });

            it('should return news by id 200 response code', function (done) {
                request.get(`${endpoint}/${firstNews._id}`, function (error, response) {

                    const article = JSON.parse(response.body);

                    expect(response.statusCode).toEqual(200);
                    expect(article).toEqual(firstNews);

                    done();
                });
            });
        });

        describe('GetNewsById with incorrect id', () => {
            beforeEach(() => {
                nock(endpoint)
                    .get(`/555`)
                    .reply(404, 'Error');
            });

            it('should return response if wrong id', function (done) {
                request.get(`${endpoint}/555`, function (error, response) {
                    expect(response.statusCode).toEqual(404);
                    expect(response.body).toBeTruthy();

                    done();
                });
            });
        });
    });

    describe('CreateNews', () => {
        let postBody = JSON.stringify(stubNewArticle);

        beforeEach(() => {
            nock(endpoint)
                .post('')
                .reply(200, postBody);
        });

        it('should post new article and return it with 200 response code', function (done) {
            request.post(endpoint, { form: stubNewArticle }, function (error, response) {

                const article = JSON.parse(response.body);

                expect(response.statusCode).toEqual(200);
                expect(article).toEqual(stubNewArticle);

                done();
            });
        });
    });

    describe('UpdateNews', () => {
        let putBody = JSON.stringify(stubUpdatedArticle);
        let id = '555';

        beforeEach(() => {
            nock(endpoint)
                .put(`/${id}`)
                .reply(200, putBody);
        });

        it('should update article and return it with 200 response code', function (done) {
            request.put(`${endpoint}/${id}`, { form: stubUpdatedArticle }, function (error, response) {
                const article = JSON.parse(response.body);

                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();

                expect(article).toEqual(stubUpdatedArticle);

                done(); // don't forget about done!!!
            })
        });
    });

    describe('DeleteNews', () => {
        let id = '152';

        beforeEach(() => {
            nock(endpoint)
                .delete(`/${id}`)
                .reply(200, 'Success');
        });

        it('should delete news by id with 200 response code', function (done) {

            request.delete(`${endpoint}/${id}`, function (error, response) {

                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();

                done();
            })
        });
    });
});



