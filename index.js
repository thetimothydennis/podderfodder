// package imports
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { configurePassport } from "./config/passport.js";
import session from "express-session";
import helmet from "helmet";


// router imports
import authRoutes from "./routes/auth-routes.js";
import UsersRouter from "./routes/user-API-routes.js";
import FrontendRoutes from "./routes/frontend-routes.js";

import { configureSession } from "./config/session.js";

config({ path: `./.env.${process.env.NODE_ENV}` });
configurePassport(passport);

// app and httpApp instantiations
const app = express();

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));

// initializing the user session with express-session
app.use(session(configureSession()));

// attaches cors middleware to allow for cross origin requests
app.use(cors());

// middleware mounts for passport and user session
app.use(passport.initialize());
app.use(passport.session());

// logging middleware
app.use(morgan("dev"));
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(authRoutes);
app.use(FrontendRoutes);
app.use(UsersRouter);

export default app;
