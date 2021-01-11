const express = require('express');
const app = express();
const morgan = require('morgan'); // Middleware -> Procesa datos antes que el servidor los reciba

// Setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // entiende dato de form html
app.use(express.json()); // entiende formato json

// Routes
app.use(require('./routes/'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));
// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});