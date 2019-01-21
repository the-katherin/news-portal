var express = require('express');
var router = express.Router();

const newsJson = require('../public/data/news.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(newsJson); // todo render layout or users
});

module.exports = router;
