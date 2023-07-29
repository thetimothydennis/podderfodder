import express from 'express';
import 'dotenv/config';
import https from 'https';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import authRoutes from './routes/auth-routes.js';
import UsersRouter from './routes/user-API-routes.js';
import FrontendRoutes from './routes/frontend-routes.js';

import { User } from './models/user-schema.js';

const options = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
    //ca: process.env.SSL_CA
};

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
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
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(authRoutes);
app.use(FrontendRoutes);
app.use(UsersRouter);


