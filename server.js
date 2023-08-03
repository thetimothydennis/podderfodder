import dotenv from 'dotenv';
dotenv.config({ path: `./.env.${process.env.NODE_ENV}`})

import http from 'http';
import https, { globalAgent } from 'https';

globalAgent.options.rejectUnauthorized = false;

import app from './index.js';
import httpApp from './httpApp.js';
import { ssl_options } from './config/certs.js';

// imports port environment variables for https and http servers
const PORT = process.env.PORT;
const httpPORT = process.env.HTTP_PORT;

// starts the http redirect server
if (process.env.NODE_ENV === "prod") {
    http.createServer(httpApp)
    .listen(httpPORT, () => {
        console.log(`http app listening on port ${httpPORT}`);
    });
} else {
    http.createServer(app)
        .listen(httpPORT, () => {
            console.log(`app listening on port ${httpPORT}`)
        });
};

// starts the https server
https.createServer(ssl_options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });