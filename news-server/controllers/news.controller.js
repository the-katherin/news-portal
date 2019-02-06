const News = require('../db/News.model');

const uuidv1 = require('uuid/v1');

const GetNews = (req, res, next) => {
    News.find({}, function (err, news) {
        if (err) {
            next(err);
        } else {
            res.json(news);
        }
    });
};

const GetNewsById = (req, res, next) => {
    const { id } = req.params;

    News.find({ id: id }, function (err, newsItem) {
        if (err) {
            next(err);
        } else if (newsItem.length) {
            res.send(newsItem);
        } else {
            next();
        }
    });
};

const CreateNews = (req, res, next) => {
    const { payload, title } = req.body;
    const news = {
        id: uuidv1(),
        title,
        payload,
    };

    News.create({ ...news }, function (err, newsItem) {
        if (err) {
            next(err);
        } else {
            res.send(`News is successfully saved: ${newsItem}`);
        }
    })
};


const UpdateNews = (req, res, next) => {
    const { id } = req.params;
    const { payload } = req.body;

    News.findOneAndUpdate({ id: id }, { payload: payload }, function (err, newsItem) {
        if (err) {
            next(err);
        } else if (newsItem) {
            res.send(`Successfully updated`);
        } else {
            next();
        }
    });
};

const DeleteNews = (req, res, next) => {
    const { id } = req.params;

    News.findOneAndDelete({ id: id }, function (err, newsItem) {
        if (err) {
            next(err);
        } else if (newsItem) {
            res.send(`Successfully deleted`);
        } else {
            next();
        }
    });
};

module.exports = {
    GetNews,
    GetNewsById,
    CreateNews,
    UpdateNews,
    DeleteNews,
};