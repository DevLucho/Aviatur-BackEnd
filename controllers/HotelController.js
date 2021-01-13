const data = require('../sample/data.json');

function getHotels(req, res) {
    res.status(200).send(data);
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
                if (iterator.stars == arr[i]) {
                    newData.push(iterator);
                }
            }
        }
    }
    res.status(200).send(newData);
}

function getHotelsSearch(req, res) {
    let { txt } = req.params;
    let filtreData = [];
    data.filter((val) => {
        if (txt === "") {
            
        } else if (val.name.toLowerCase().includes(txt.toLowerCase())) {
            filtreData.push(val)
        }
    })

    res.status(200).send(filtreData)
}

module.exports = {
    getHotels,
    getHotelsFilterStar,
    getHotelsSearch
}