import express from 'express';
import 'dotenv/config';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';

import PodsAndEpisRouter from './routes/pod-API-routes.js';
import UsersRouter from './routes/user-API-routes.js';
import SearchRouter from './routes/search-pod-API-routes.js';
import FrontendRoutes from './routes/frontend-routes.js';

const app = express();

const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(PodsAndEpisRouter);
app.use(FrontendRoutes);
app.use(SearchRouter);
app.use(UsersRouter);

const options = {};

http.createServer(options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });
