// model import for passport
import { User } from '../models/user-schema.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export function configurePassport (passport) {

    const googleconfig = {
        clientID: process.env.GOOG_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOG_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOG_OAUTH_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(
        googleconfig,
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user)
                } else {
                    let newUser = new User({
                        googleId: profile.id
                    });
                    newUser.username = profile.emails[0].value;
                    newUser.email = profile.emails[0].value;
                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                done(err);
            }
        }
    ));

    // Github strategy
    const githubConfig = {
        clientID: process.env.GH_OAUTH_CLIENT_ID,
        clientSecret: process.env.GH_OAUTH_CLIENT_SECRET,
        callbackUrl: process.env.GH_OAUTH_CALLBACK_URL
    };

    passport.use(new GithubStrategy(
        githubConfig,
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });
                if (user) {
                    return done(null, user)
                } else {
                    let newUser = new User({
                        githubId: profile.id
                    });
                    if (profile.emails && profile.emails.length > 0) {
                        newUser.email = profile.emails[0].value;
                    } else {
                        newUser.email = profile.id;
                    }
                    if (profile.displayName) {
                        newUser.name = profile.displayName;
                    } else {
                        newUser.name = profile.username;
                    }
                    newUser.username = profile.username;
                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                done(err);
            };
        }
    ))

    // local strategy via passport-local-mongoose
    passport.use(User.createStrategy());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user); 
        } catch (err) {
            done(err);
        };
    });
};