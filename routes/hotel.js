const express = require('express');
const { getHotels, getHotelsFilterStar, getHotelsSearch } = require('../controllers/HotelController');
const api = express.Router();

api.get('/', getHotels);
api.get('/:txt', getHotelsSearch);
api.post('/', getHotelsFilterStar);

module.exports = api
