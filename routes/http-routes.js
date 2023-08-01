import express from 'express';
import * as httpCTRL from '../controllers/http-controller.js';

const router = express.Router();

router.get('*', httpCTRL.httpRedirectAll);

export default router;