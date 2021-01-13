const express = require('express');
const { getHotels, getHotelsFilterStar } = require('../controllers/HotelController');
const api = express.Router();

api.get('/', getHotels);
api.post('/', getHotelsFilterStar);

module.exports = api
