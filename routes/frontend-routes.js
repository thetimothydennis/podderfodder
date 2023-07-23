// package imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { appRoute} from '../controllers/frontend-controller.js';
import isAuthenticated from '../middleware/is-authenticated.js';

// stores __dirname for use within ES6 modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// instantiates the frontend router
const router = express.Router();

// static middleware for serving the frontend
router.use(express.static(path.join(__dirname, "..", "client", "dist")));

// frontend routes
    // login route
router.get("/login", appRoute);
    // register route
router.get("/register", appRoute);
    // authenticated app route
router.get("/app", isAuthenticated, appRoute);

// exports the router for index.js
export default router;