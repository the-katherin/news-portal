const User = require('../db/User.model');

const RegisterUser = (req, res, next) => {
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
};

module.exports = { RegisterUser };