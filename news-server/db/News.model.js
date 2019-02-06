const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    id: String,
    title: String,
    payload: String,
});

module.exports = mongoose.model('News', NewsSchema);
