var express = require('express');
var router = express.Router();

const newsJSON = require('../data/news.json');
let newsArray = newsJSON;

/* GET news listing. */
router.get('/', function (req, res) {
  res.json(newsArray); // todo render layout
});

/* POST new news item */

router.post('/', function (req, res) {
  const { payload, title } = req.body;
  const news = {
    id: Date.now(),
    title,
    payload,
  };

  newsArray.push(news);
  res.send(newsArray);
});

/* PUT payload data to specified with ID news item */

router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { payload } = req.body;
  const news = newsArray.find(newsItem => newsItem.id === id);

  if (news) {
    news.payload = payload;
  };

  res.send(newsArray);
});

/* DELETE specified with ID news item */

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  const newsIndex = newsArray.findIndex(newsItem => newsItem.id === id);

  if (newsIndex > -1) {
    newsArray.splice(newsIndex, 1);
  };

  res.send(newsArray);
});

module.exports = router;
