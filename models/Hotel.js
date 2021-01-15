const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hotel = Schema({
    name: String,
    stars: Number,
    price: Number,
    image: String,
    amenities: Array
}, { timestamps: true, versionKey: false });

Hotel.methods.setImgUrl = function setImgUrl (filename) {
    this.image = filename;
}

module.exports = mongoose.model('hotels', Hotel)