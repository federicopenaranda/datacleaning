var path = require('path');

module.exports.rootPath = path.dirname(__dirname);

module.exports.middlewareUrl = 'http://localhost:3000'

module.exports.port = 3000;


const tenantName    = 'hyderfy';
const clientID      = 'f06fc787-0671-44a4-a51d-6912df0f7d9d';
const redirectUrl   = 'http://localhost:4200/auth-callback';


// Set current environment: Production (true), Development (false)
const production = false;

module.exports.cors = ( production ) ? 
    [

    ] : 
    [
        "http://localhost:4200",
        "http://localhost:8080"
    ];

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