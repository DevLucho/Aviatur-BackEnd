// const data = require('../sample/data.json');
const Hotel = require('../models/Hotel');
const moment = require('moment');
const HotelModel = require('../models/Hotel');

async function createHotel(req, res) {

    const { name, stars, price, amenities } = req.body;

    const hotel = Hotel({
        name,
        stars,
        price,
        amenities
    })

    if (req.file) {
        hotel.setImgUrl(req.file.filename);
    }

    await hotel.save(hotel, (err, data2) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al guardar los datos" });
        } else {
            res.status(200).send({ status: true, message: "Hotel creado exitósamente" });
        }
    });
}

async function getAllHotels(req, res) {
    await HotelModel.find((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al listar los hoteles" });
        } else {
            res.status(200).send({ data: data });
        }
    });
}

async function findHotelById(req, res) {
    await HotelModel.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al buscar el hotel" });
        } else if (data == null) {
            res.status(200).send({ status: false, message: "El hotel no se encuentra dentro del sistema" });
        } else {
            res.status(200).send({ data: data });
        }
    })
}

async function updateHotel(req, res) {
    let { name, stars, price, amenities } = req.body;

    let hotel = Hotel({
        name,
        stars,
        price,
        amenities
    })

    if (req.file) {
        hotel.setImgName(req.file.filename);
    }

    //hotel.updated_at = new Date(moment().toISOString());
    await HotelModel.findByIdAndUpdate(hotel._id, hotel, { useFindAndModify: false }, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al actualizar el hotel" });
        } else {
            res.status(200).send({ status: true, message: "Hotel actualizado exitosamente" });
        }
    });
}

async function deleteHotel(req, res) {
    await HotelModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al eliminar el hotel" });
        } else {
            res.status(200).send({ status: true, message: "Hotel eliminado exitosamente" });
        }
    });
}

async function getHotelsFilterStar(req, res) {
    let arr = req.body; // estrellas especificadas
    let newData = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) { // filtra todos los hoteles
            const hotelStorage = await HotelModel.find({}).sort('stars').exec();
            res.status(200).send({ data: hotelStorage });
            break;
        } else {
            const hotelStorage = await HotelModel.find({}).sort('stars').lean().exec();
            for (let j of hotelStorage) {
                if ((parseInt(j.stars) === parseInt(arr[i])) && ((parseInt(arr[i]) >= 1 && parseInt(arr[i]) <= 5))) {
                    newData.push(j);
                }
            }
        }
    }

    res.status(200).send({ data: newData });
}

async function getHotelsSearch(req, res) {
    const { txt } = req.params; // nombre del hotel a filtrar
    const filtreData = [];

    await HotelModel.find((err, data) => {
        if (err) {
            res.status(200).send({ status: false, message: "Fallo al buscar los hoteles" });
        } else {
            for (let i of data) {
                if (txt === "") {

                } else if (i.name.toLowerCase().includes(txt.toLowerCase())) {
                    filtreData.push(i); // agrega al arr hoteles que incluyan el nombre a filtrar 
                }
            }
        }
    })

    res.status(200).send({ data: filtreData });
}

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    findHotelById,
    getHotelsFilterStar,
    getHotelsSearch
}