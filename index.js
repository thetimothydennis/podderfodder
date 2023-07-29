// package imports
import express from 'express';
import 'dotenv/config';
import http from 'http';
import https from 'https';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// router imports
import authRoutes from './routes/auth-routes.js';
import UsersRouter from './routes/user-API-routes.js';
import FrontendRoutes from './routes/frontend-routes.js';

// model import for passport
import { User } from './models/user-schema.js';

// certificate options for https server
const ssl_options = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
    ca: process.env.SSL_CA
};

// options for setting up the user session, storing it in mongoDB
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: true,
        httpOnly: false,
        maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE)
    }
};

// app and hattpApp instantiations
const app = express();
const httpApp = express();

// initializing the User strategy with passport
passport.use(User.createStrategy());
// initializing the user session with express-session
app.use(session(sessionOptions));

// imports port environment variables for https and http servers
const PORT = process.env.PORT;
const httpPORT = process.env.HTTP_PORT;

// attaches cors middleware to allow for cross origin requests
app.use(cors());

// middleware mounts for passport and user session
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// starts the https server
https.createServer(ssl_options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });

// logging middleware
app.use(morgan('dev'));
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use(authRoutes);
app.use(FrontendRoutes);
app.use(UsersRouter);

// route redirects requests from the http server to the https server
httpApp.get('*', (req, res) => {
    res.redirect(`https://${req.headers.host}:${PORT}${req.path}`);
});

// starts the http redirect server
http.createServer(httpApp)
    .listen(httpPORT, () => {
        console.log(`http app listening on port ${httpPORT}`);
    });
