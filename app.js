const { appConfig } = require('./config');
const morgan = require('morgan'); // Middleware -> Procesa datos antes que el servidor los reciba
const cors = require('cors');
const path = require('path')
const express = require('express');

const app = express();

// setting
app.set('host', appConfig.host);
app.set('port', process.env.PORT || appConfig.port);
app.set('json spaces', 2);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // entiende dato de form html
app.use(express.json()); // entiende formato json

// routes
app.use('/api/hotels', require('./routes/hotel'));

// archivos staticos
app.use('/public/img', express.static(path.join(__dirname, 'assets', 'images')));
app.use('/public/img/hotels', express.static(path.join(__dirname, 'assets', 'images', 'hotels')));
app.use('/public/ico/amenities', express.static(path.join(__dirname, 'assets', 'icons')));
app.use('/public/ico/filters', express.static(path.join(__dirname, 'assets', 'icons', 'filters')));

module.exports = app