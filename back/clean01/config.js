var path = require('path');

module.exports.rootPath = path.dirname(__dirname);

module.exports.middlewareUrl = 'http://localhost:3000'

module.exports.port = 3000;


// Set current environment: Production (true), Development (false)
const production = false;

const cors = ( production ) ? 
    [
        
    ] : 
    [
        "http://localhost:4200",
        "http://localhost:8080"
    ];

module.exports.corsConfig = {
    origin: cors,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
};


let databaseConfig = {};
let datasetPath = '';

// Database connection data and dataset folder path
if ( production )
{
    /* Production Server */
    databaseConfig = {
        user: 'dq_admin',
        host: 'localhost',
        database: 'dq',
        password: 'DQ@dm1n',
        port: 5432
    };

    datasetPath = 'C:/courses/angular/DataCleaning/back/clean01/public/datasets';
}
else
{
    /* Local Server */
    databaseConfig = {
        user: 'dq_admin',
        host: 'localhost',
        database: 'dq',
        password: 'test-1',
        port: 5432
    };

    datasetPath = 'C:/courses/angular/DataCleaning/back/clean01/public/datasets';
}

module.exports.databaseConfig = databaseConfig;
module.exports.datasetPath = datasetPath;

module.exports.production = production;