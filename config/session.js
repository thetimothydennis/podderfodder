import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';

dotenv.config({ path: `../.env.${process.env.NODE_ENV}`})

// options for setting up the user session, storing it in mongoDB
export const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE)
    }
};