const nock = require('nock');

const request = require('request');

const endpoint = 'http://localhost:3000/users';

const usersLength = 1;

const firstUser = {
    _id: "5c74e6201c9d4400004b4bfe",
    name: "Kate",
    password: "Katepassword"
};

const allUsers = [firstUser];

const stubNewUser = {
    name: "Kate1",
    password: "Katepassword1"
}

describe('usersControlle', () => {

    describe('GetUsers', () => {

        beforeEach(() => {
            nock(endpoint)
                .get('/all')
                .reply(200, allUsers);
        });

        it('should return all users with 200 response code', function (done) {
            request.get(`${endpoint}/all`, function (error, response) {
                const users = JSON.parse(response.body);

                expect(response.statusCode).toEqual(200);
                expect(users).toEqual(allUsers);


                expect(users.length).toBe(usersLength);
                expect(users).toContain(firstUser);

                done();
            });
        });
    });


    describe('RegisterUser', () => {

        beforeEach(() => {
            nock(endpoint)
                .post('/register')
                .reply(302, 'Found. Redirecting to /users/login');
        });

        it('should create new user with 302  response code', function (done) {
            request.post(`${endpoint}/register`, { form: stubNewUser }, function (error, response) {

                expect(response.statusCode).toEqual(302);
                expect(response.body).toBe('Found. Redirecting to /users/login');

                done();
            });
        });
    });

    describe('RegisterUser if name is already occypied', () => {

        beforeEach(() => {
            nock(endpoint)
                .post('/register')
                .reply(302, 'Sorry, the name is occupied, try another');
        });

        it('shouldn`t create new user if the name is occupied and redirect with 302  response code', function (done) {
            request.post(`${endpoint}/register`, { form: stubNewUser }, function (error, response) {

                expect(response.statusCode).toEqual(302);
                expect(response.body).toBe('Sorry, the name is occupied, try another');

                done();
            });
        });
    });
});



