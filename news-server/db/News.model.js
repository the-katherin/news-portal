const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    author: String,
    description: String,
    title: String,
    publishedAt: String,
    urlToImage: String,
    source: String,
    imgType: String,
});

module.exports = mongoose.model('Article', NewsSchema);
