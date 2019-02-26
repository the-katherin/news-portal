const User = require('../db/User.model');

const { GetUsers, GetUserByName, RegisterUser } = require('../controllers/users.controller');

const request = require('request');

const endpoint = 'http://localhost:3000/users';

const usersLength = 1;

const firstUser = {
    _id: "5c74e6201c9d4400004b4bfe",
    name: "Kate",
    password: "Katepassword"
};

const stubNewUser = {
    name: "Kate1",
    password: "Katepassword1"
}

describe('usersControlle', () => {
   describe('GetUsers', () => {
       it('should return users with 200 response code', function (done) {
           request.get(`${endpoint}/all`, function (error, response) {
               expect(response.statusCode).toEqual(200);
               expect(response.body).toBeTruthy();

               const users = JSON.parse(response.body);

               expect(users.length).toBe(usersLength);
               expect(users).toContain(firstUser);

               done();
           });
       });
   });

    describe('RegisterUser', () => {
        it('should create new user with 302  response code', function (done) {
            request.post(`${endpoint}/register`, {form: stubNewUser}, function (error, response) {
                expect(response.statusCode).toEqual(302);
                expect(response.body).toBe('Found. Redirecting to /users/login');

                done();
            });
        });

        it('shouldn`t create new user if the name is occupied and redirect with 302  response code', function (done) {
            request.post(`${endpoint}/register`, {form: stubNewUser}, function (error, response) {

                expect(response.statusCode).toEqual(302);
                expect(response.body).toBe('Found. Redirecting to /users/register');

                done();
            });
        });
    });


    describe('GetUserByName', () => {
        it('should return users by name with 200  response code', function (done) {
            request.get(`${endpoint}/${stubNewUser.name}`, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();

                const user = JSON.parse(response.body);

                expect(user.password).toBe(stubNewUser.password);

                done();
            })
        });
    });

    describe('DeleteUser', () => {
        it('should delete news by id with 200 response code', function (done) {
            request.delete(`${endpoint}/${stubNewUser.name}`, function (error, response) {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBeTruthy();
            })
                .pipe(
                    request.get(`${endpoint}/all`, function (error, response) {
                        expect(response.statusCode).toEqual(200);
                        expect(response.body).toBeTruthy();

                        const users = JSON.parse(response.body);

                        expect(users.length).toBe(usersLength);

                        done();
                    }));
        });
    });

});



