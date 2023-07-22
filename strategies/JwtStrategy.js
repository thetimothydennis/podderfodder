import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
const JwtStrategy = Strategy();
import User from '../models/user.js';

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

// use by authenticated requests to deserialize user
// in other words, fetch user details from the JWT
passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
        // check against DB only if necessary
        // can be avoided if you don't want to fetch details in every request
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false)
                // or create a new account
            }
        })
    })
)
