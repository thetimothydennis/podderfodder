import express from 'express';
import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';

import UsersRouter from './routes/user-API-routes.js';
import SearchRouter from './routes/search-pod-API-routes.js';
import FrontendRoutes from './routes/frontend-routes.js';
import CoreAPIRoutes from './routes/pod-API-routes.js';


const options = {
    key: fs.readFileSync('./certs/localhost.key'),
    cert: fs.readFileSync('./certs/localhost.crt')
};

const app = express();

// establishes environment variables for auth0 as local constants
const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

// checks for port and origin url for auth0
if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    // if client origin or port aren't in the environment variables, throws an error
    throw new Error(
        "Missing required environment variables. Check docs for more information."
    );
};

// cross-origin resource sharing middleware for auth0
app.use(
    cors({
        origin: CLIENT_ORIGIN_URL,
        methods: ['GET'],
        allowedHeaders: ["Authorization", "Content-Type"],
        maxAge: 86400,
    })
);

https.createServer(options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(CoreAPIRoutes)
app.use(SearchRouter);
app.use(FrontendRoutes);
app.use(UsersRouter);
