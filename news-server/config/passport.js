const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../db/User.model');
const config = require('../config/config');
const { id: facebookId, secretKey } = config.facebook;
require('https').globalAgent.options.rejectUnauthorized = false;

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ name: username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (+user.password !== +password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: facebookId,
        clientSecret: secretKey,
        callbackURL: "http://localhost:3000/users/auth/facebook/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            const { displayName: userName, id } = profile;

            User.findOne({ name: userName }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    User.create({ name: userName, password: id, id: id }, function (err, user) {
                        if (err) {
                            throw err;
                        } else {
                            return done(null, user);
                        }
                    })
                } else {
                    return done(null, user);
                }
            });
        }
    ));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};