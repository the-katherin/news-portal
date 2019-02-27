const express = require('express');
const router = express.Router();
const passport = require('passport');

const { GetUserByName, GetUsers, RegisterUser, DeleteUser } = require('../controllers/users.controller');

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/all', GetUsers);

router.post('/register', RegisterUser);

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: 'You successfully logged in',
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/users/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router;
