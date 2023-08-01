// package imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `./.env.${process.env.NODE_ENV}`})
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';

// router imports
import authRoutes from './routes/auth-routes.js';
import UsersRouter from './routes/user-API-routes.js';
import FrontendRoutes from './routes/frontend-routes.js';

// model import for passport
import { User } from './models/user-schema.js';

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

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false}))

// initializing the User strategy with passport
passport.use(User.createStrategy());
// initializing the user session with express-session
app.use(session(sessionOptions));

// attaches cors middleware to allow for cross origin requests
app.use(cors());

// middleware mounts for passport and user session
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// logging middleware
app.use(morgan('dev'));
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use(authRoutes);
app.use(FrontendRoutes);
app.use(UsersRouter);

export default app;