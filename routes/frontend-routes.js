// package imports
import express from 'express';
import { appRoute, resetPasswordPage } from '../controllers/frontend-controller.js';
import isAuthenticated from '../middleware/is-authenticated.js';
import path from 'path';
import { fileURLToPath } from 'url';

// instantiates the frontend router
const router = express.Router();

// stores __dirname for use within ES6 modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// static middleware for serving the frontend
router.use(express.static(path.join(__dirname, "..", "client", "dist")));

// login route
router.get("/login", appRoute);
// register route
router.get("/register", appRoute);
// page for initiating forgot password workflow
router.get('/forgotpassword', appRoute);
// page for resetting password after receiving tokenized link
router.get('/resetpassword/:token', resetPasswordPage);
// authenticated app route
router.get("/app", isAuthenticated, appRoute);
// route for changing password by user who is logged in
router.get('/changepassword', isAuthenticated, appRoute);

// exports the router for index.js
export default router;