import express from 'express';
import { search } from '../controllers/search-pods-controller.js';

const router = express.Router();

router.get('/api/search/', search);

export default router;