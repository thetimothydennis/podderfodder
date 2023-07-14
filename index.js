import express from 'express';
import 'dotenv/config';
import http from 'http';
import morgan from 'morgan';

// import PodsAndEpisRouter from './routes/pod-API-routes.js';
import UsersRouter from './routes/user-API-routes.js';
import SearchRouter from './routes/search-pod-API-routes.js';

const app = express();
app.use(morgan('dev'));

const PORT = process.env.PORT;

app.use(express.json());
// app.use(PodsAndEpisRouter);
app.use(SearchRouter);
app.use(UsersRouter);

const options = {};

http.createServer(options, app)
    .listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    });
