const express = require('express');
const router = express.Router();

const {
  GetNews,
  GetNewsById,
  CreateNews,
  UpdateNews,
  DeleteNews,
} = require('../controllers/news.controller');

const authHandler = require('../middlewares/authHandler');

/* GET news listing. */

router.get('/', GetNews);

/* GET news by id. */

router.get('/:id', GetNewsById);

/* POST new news item */

router.post('/', CreateNews);

/* PUT payload data to specified news item */

router.put('/:id', authHandler, UpdateNews);

/* DELETE specified news item */

router.delete('/:id', authHandler, DeleteNews);

module.exports = router;
