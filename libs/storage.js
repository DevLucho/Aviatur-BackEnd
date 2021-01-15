const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.APP_DIR_STORAGE);
    },
    filename: function (req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});

const upload = multer({storage})
module.exports = {
    upload,
    // archivos_amenities
}