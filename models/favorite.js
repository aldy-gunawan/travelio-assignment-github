const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    thumbnail: {
        type: String
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);