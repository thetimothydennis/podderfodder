import express from 'express';
import { search } from '../controllers/search-pods-controller.js';
import isAuthenticated from '../middleware/is-authenticated.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/api/search/', search);

export default router;