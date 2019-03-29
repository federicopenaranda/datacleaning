var path = require('path');

module.exports.rootPath = path.dirname(__dirname);

module.exports.middlewareUrl = 'http://localhost:3000'

module.exports.authMethods = {
    native: true,
    microsoft: true,
    google: false
}

module.exports.enable_https = false;

// These 2 variables are not required if "enable_https" variable is set to false
module.exports.ssl_key_path = 'C:/Users/fede/Centennial/dev/back/centennial/ssl/server.key';
module.exports.ssl_cert_path = 'C:/Users/fede/Centennial/dev/back/centennial/ssl/STAR_hyderfy_com.crt';


// Metabase variables
module.exports.metabase_url = 'https://test.hyderfy.com:8443';
module.exports.metabase_key = 'f9b9cc29b893824199da2207027c4d35332c3be2713ca29e45f55e81655a38b7';

module.exports.port = 3000;


const tenantName    = 'hyderfy';
const clientID      = 'f06fc787-0671-44a4-a51d-6912df0f7d9d';
const redirectUrl   = 'http://localhost:4200/auth-callback';

module.exports.microsoftCreds = {
    identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`, 
    redirectUrl: redirectUrl,
    clientID: clientID, // if you are doing code or id_token code
    skipUserProfile: true, // for AzureAD should be set to true.
    responseType: 'id_token code', // for login only flows use id_token. For accessing resources use `id_token code`
    responseMode: 'query', // For login only flows we should have token passed back to us in a POST
    audience: 'f06fc787-0671-44a4-a51d-6912df0f7d9d'
};

// Set current environment: Production (true), Development (false)
const production = false;

module.exports.cors = ( production ) ? 
    [
        "http://dq.centennialdatagroup.com", 
        "https://dq.centennialdatagroup.com", 
        "http://demo.hyderfy.com", 
        "https://demo.hyderfy.com", 
        "http://test.hyderfy.com",
        "https://test.hyderfy.com"
    ] : 
    [
        "http://localhost:4200",
        "http://localhost:8080"
    ];


// Test Connection Script path
module.exports.testConnectionScriptPath = ( production ) ? 
    '/var/www/html/scriptella/test_connection.sh' :
    'C:\\Users\\fede\\Centennial\\dev\\back\\test_connection_script.bat';

// Test Stage Data Script path
module.exports.testStageDataScriptPath = ( production ) ? 
    '/var/www/html/scriptella/test_connection.sh' :
    'C:\\Users\\fede\\Centennial\\dev\\back\\test_connection_script.bat';


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