const data = require('../sample/data.json');

function getHotels(req, res) {
    res.status(200).send({ data });
}

function getHotelsFilterStar(req, res) {
    const arr = req.body;
    let newData = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            res.status(200).send(data)
            break;
        } else {
            for (iterator of data) {
                if(iterator.stars == arr[i]){
                    newData.push(iterator);
                }
            }
        }
    }
    res.status(200).send( newData );
}

module.exports = {
    getHotels,
    getHotelsFilterStar
}