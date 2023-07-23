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
const PORT = process.env.PORT;

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

https.createServer(options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(FrontendRoutes);
app.use(UsersRouter);
app.use(SearchRouter);


