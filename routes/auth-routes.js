import express from 'express';
import passport from 'passport';
import { User } from '../user-schema.js';

const router = express.Router();

router.post('/api/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/app'
    })
);

router.post('/api/register', (req, res) => {
    if (req.body.password !== req.body.passwordMatch) {
        res.redirect('/register')
    } else {
        const user = new User({ username: req.body.username, email: req.body.email, name: req.body.name })
        User.register(user, req.body.password, (err) => {
            if (err) {
                res.redirect("/register");
                return;
            };
            console.log(`user registered`);
            res.redirect("/app");
        });
    };
});

router.get('/api/logout', (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

router.get('/api/user-data', (req, res) => {
    if (req.user === undefined) {
        res.json({})
    } else {
        res.json({
            user_id: req.user._id
        })
    };
});

export default router;