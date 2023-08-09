import { Router } from "express";
// import auth controller
import * as AuthCTRL from "../controllers/auth-controller.js";

const router = Router();

// route for authenticating user
router.post("/api/login", AuthCTRL.postLogin);
// route for registering a user in the database
router.post("/api/register", AuthCTRL.postRegister);
// route for user log-out
router.get("/api/logout", AuthCTRL.getLogout);
// route to fetch user data on first load of frontend
router.get("/api/user-data", AuthCTRL.getUserData);
// route to change user password if already logged in
router.post("/api/changepassword", AuthCTRL.postChangePassword);
// route to initiate password recovery workflow
router.post("/api/forgotpassword", AuthCTRL.postForgotPassword);
// route for resetting password after recovery email is sent
router.post("/api/resetpassword/:token", AuthCTRL.postResetPassword);
// callback route for github oauth
router.get("/oauth/github/callback", AuthCTRL.handleGithubCallback);
// route for logging in with github
router.get("/github", AuthCTRL.handleGithubLogin);
// callback route for google oauth
router.get("/oauth/google/callback", AuthCTRL.handleGoogleCallback);
// route for logging in with google
router.get("/google", AuthCTRL.handleGoogleLogin);

export default router;
