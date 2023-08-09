import express from "express";
import httpRoutes from "./routes/http-routes.js";
import helmet from "helmet";

const httpApp = express();

httpApp.disable("x-powered-by");
httpApp.use(helmet());

// route redirects requests from the http server to the https server
httpApp.use(httpRoutes);

export default httpApp;
