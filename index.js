require('dotenv').config();
const app = require('./app');
const connectDb = require('./db/mongodb');
const { dbConfig } = require('./config');

function initApp() {
    try {
        // Conexion DB
        connectDb(dbConfig)
        // Iniciar el servidor
        app.listen(app.get('port'), () => {
            console.log(`Server on port ${app.get('port')}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
}

initApp();