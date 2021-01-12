const data = require('../sample/data.json');

function getHotels(req, res) {
    res.status(200).send({ data });
}

module.exports = {
    getHotels
}