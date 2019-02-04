const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/User.model');

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

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};



// const { Strategy } = require('passport-github');
// const User = require('../models/user');
// const config = require('../config');

// const githubStrategy = new Strategy(config.githubAuth,
//     function (accessToken, refreshToken, profile, done) {
//         return User
//             .findOne({ 'githubId': profile.id })
//             .then(user => user ? user : new User({ githubId: profile.id, username: profile.username }).save())
//             .then(data => done(null, data.toJSON()))
//             .catch(err => done(err));
//     }
// );

// module.exports = githubStrategy;