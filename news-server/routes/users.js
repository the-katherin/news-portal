const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../db/User.model');

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res, next) {
    const { name, password } = req.body;

    User.find({ name: name }, function (err, user) {
        if (err) {
            next(err);
        } else if (user.length !== 0) {
            req.flash("error", 'Sorry, the name is occupied, try another');
            res.redirect('/users/register');
        } else {
            User.create({ name, password }, function (err, user) {
                if (err) {
                    next(err);
                } else {
                    req.flash("info", 'Successfully registered, now you can log in');
                    res.redirect('/users/login');
                }
            })
        }
    });
});

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

module.exports = router;