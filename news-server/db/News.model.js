const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    id: Number,
    title: String,
    payload: String,
});

module.exports = mongoose.model('News', NewsSchema);
