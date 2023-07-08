import express from 'express';
import 'dotenv/config';
import http from 'http';
import morgan from 'morgan';

import APIrouter from './routes/API-routes.js';

const app = express();
app.use(morgan('dev'));

const PORT = process.env.PORT;

app.use(express.json());
app.use(APIrouter);

const options = {};

http.createServer(options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });
