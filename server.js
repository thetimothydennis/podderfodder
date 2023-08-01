import dotenv from 'dotenv';
dotenv.config({ path: `./.env.${process.env.NODE_ENV}`})

import http from 'http';
import https from 'https';

import app from './index.js';
import httpApp from './httpApp.js';

// certificate options for https server
const ssl_options = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
    ca: process.env.SSL_CA
};

// imports port environment variables for https and http servers
const PORT = process.env.PORT;
const httpPORT = process.env.HTTP_PORT;

// starts the http redirect server
http.createServer(httpApp)
    .listen(httpPORT, () => {
        console.log(`http app listening on port ${httpPORT}`);
    });

// starts the https server
https.createServer(ssl_options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });