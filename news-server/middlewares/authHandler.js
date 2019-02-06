const authHandler = (req, res, next) => {
    // Redirect user to login page, if the user hasn't logged in
    if (!req.user) {
        res.redirect('/users/login');
    } else {
        next();
    }
};

module.exports = authHandler;