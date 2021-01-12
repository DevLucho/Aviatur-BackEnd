const express = require('express');
const { getHotels } = require('../controllers/HotelController');
const api = express.Router();

api.get('/', getHotels);

module.exports = api
