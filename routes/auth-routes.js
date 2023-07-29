import express from 'express';
import * as AuthCTRL from '../controllers/auth-controller.js';

const router = express.Router();

// route for authenticating user
router.post('/api/login', AuthCTRL.postLogin);
// route for registering a user in the database
router.post('/api/register', AuthCTRL.postRegister);
// route for user log-out
router.get('/api/logout', AuthCTRL.getLogout);
// route to fetch user data on first load of frontend
router.get('/api/user-data', AuthCTRL.getUserData);
// route to change user password if already logged in
router.post('/api/changepassword', AuthCTRL.postChangePassword);
// route to initiate password recovery workflow
router.post('/api/forgotpassword', AuthCTRL.postForgotPassword);
// route for resetting password after recovery email is sent
router.post('/api/resetpassword/:token', AuthCTRL.postResetPassword);

export default router;