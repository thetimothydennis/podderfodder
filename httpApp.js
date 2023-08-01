import express from 'express';
import httpRoutes from './routes/http-routes.js';

const httpApp = express();

// route redirects requests from the http server to the https server
httpApp.use(httpRoutes);

export default httpApp;