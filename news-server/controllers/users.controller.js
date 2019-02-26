const User = require('../db/User.model');

const GetUsers = (req, res, next) => {
    User.find({}, function (err, users) {
        if (err) {
            next(err);
        } else {
            res.json(users);
        }
    });
};

const GetUserByName = (req, res, next) => {
    const { name } = req.params;

    User.findOne({name: name}, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.send(user);
        }
    });
};

const DeleteUser = (req, res, next) => {
    const { name } = req.params;

    User.findOneAndDelete({ name: name }, function (err, user) {
        if (err) {
            next(err);
        } else if (user) {
            res.send(`Successfully deleted`);
        } else {
            next();
        }
    });
};

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

module.exports = { GetUsers, GetUserByName, RegisterUser, DeleteUser };
