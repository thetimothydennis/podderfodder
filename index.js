import express from 'express';
import 'dotenv/config';
import https from 'https';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import UsersRouter from './routes/user-API-routes.js';
import SearchRouter from './routes/search-pod-API-routes.js';
import FrontendRoutes from './routes/frontend-routes.js';
import CoreAPIRoutes from './routes/pod-API-routes.js';

import { User } from './user-schema.js';

const options = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT
};

const sessionOptions = {
    secret: "feldman and keillor rot in hell",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
};

const app = express();

passport.use(User.createStrategy());
app.use(session(sessionOptions));

// establishes environment variables for auth0 as local constants
const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

// cross-origin resource sharing middleware for auth0
app.use(
    cors({
        // origin: CLIENT_ORIGIN_URL,
        // methods: ['GET'],
        // allowedHeaders: ["Authorization", "Content-Type"],
        // maxAge: 86400,
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// checks for port and origin url for auth0
if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    // if client origin or port aren't in the environment variables, throws an error
    throw new Error(
        "Missing required environment variables. Check docs for more information."
    );
};



https.createServer(options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(CoreAPIRoutes)
app.use(SearchRouter);
app.use(FrontendRoutes);
app.use(UsersRouter);
