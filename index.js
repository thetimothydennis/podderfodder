import express from 'express';
import 'dotenv/config';

import APIrouter from './routes/API-routes.js';

const app = express();

const PORT = process.env.PORT;

app.use(APIrouter);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})