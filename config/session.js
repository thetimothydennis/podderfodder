import { config } from "dotenv";
import MongoStore from "connect-mongo";

config({ path: `../.env.${process.env.NODE_ENV}` });

// options for setting up the user session, storing it in mongoDB
let sessionOptions = {
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	cookie: {
		httpOnly: false,
		maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE),
	},
};

export function configureSession() {
	if (process.env.NODE_ENV === "test") {
		return sessionOptions;
	} else {
		sessionOptions.cookie.secure = true;
		return sessionOptions;
	}
}
