import passport from 'passport';
import { Strategy } from 'passport-local';
const LocalStrategy = Strategy();
import User from '../models/user.js';

// called during login/sign up
passport.use(newLocalStrategy(User.authenticate()));

// called after login/signup to set user details in req.user
passport.serializeUser(User.serializeUser())