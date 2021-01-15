const express = require('express');
const { upload } = require('../libs/storage');
const { celebrate, Joi } = require('celebrate');
const HotelController = require('../controllers/HotelController');
const api = express.Router();

api.post('/create', upload.single('image'), HotelController.createHotel);

api.put('/update', upload.single('image'), HotelController.updateHotel);

api.delete('/:id', celebrate({
    params: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), HotelController.deleteHotel);

api.get('/hotel-id/:id', celebrate({
    params: Joi.object({
        id: Joi.string().required()
    }).unknown()
}), HotelController.findHotelById);

api.get('/', HotelController.getAllHotels);
api.get('/:txt', HotelController.getHotelsSearch);
api.post('/', HotelController.getHotelsFilterStar);

module.exports = api
