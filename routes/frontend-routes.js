// package imports
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as frontend from '../controllers/frontend-controller.js';

// stores __dirname for use within ES6 modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// instantiates the frontend router
const router = express.Router();

// static middleware for serving the frontend
router.use(express.static(path.join(__dirname, "..", "client", "dist")));

// frontend routes
    // root route
router.get("/", frontend.appRoute);
    // authenticated app route
router.get("/app", frontend.appRoute);
router.get("/login", frontend.appRoute)
router.get("/register", frontend.appRoute)

// exports the router for index.js
export default router;