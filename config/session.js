import MongoStore from 'connect-mongo';

// options for setting up the user session, storing it in mongoDB
export const sessionOptions = {
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