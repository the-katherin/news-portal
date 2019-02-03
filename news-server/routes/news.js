const express = require('express');
const router = express.Router();

const News = require('../db/News.model');

/* GET news listing. */

router.get('/', function (req, res, next) {
  News.find({}, function (err, news) {
    if (err) {
      next(err);
    } else {
      res.json(news);
    }
  });
});

/* GET news by id. */

router.get('/:id', function (req, res, next) {
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
});

/* POST new news item */

router.post('/', function (req, res, next) {
  const { payload, title } = req.body;
  const news = {
    id: Date.now(),
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
});

/* PUT payload data to specified news item */

router.put('/:id', function (req, res, next) {
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
});

/* DELETE specified news item */

router.delete('/:id', function (req, res, next) {
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
});

module.exports = router;
