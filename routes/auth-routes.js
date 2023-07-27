import express from 'express';
import passport from 'passport';
import { User } from '../models/user-schema.js';
import { is_email_valid } from 'node-email-validation';

const router = express.Router();

router.post('/api/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/app'
    })
);

router.post('/api/register', async (req, res) => {
    if (req.body.password !== req.body.passwordMatch) {
        res.redirect('/register');
    } else if (is_email_valid(req.body.email) === false) {
        res.redirect('/register');
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
    req.session.destroy();
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

router.post('/api/changepassword', async (req, res) => {
    let { username, oldpassword, newpassword, newpassmatch } = req.body;
    if (newpassword !== newpassmatch) {
        console.log('error 0')
        res.redirect('/changepassword');
    } else {
        await User.findByUsername(username, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                user.changePassword(oldpassword, newpassword, (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect(`/login`);
                    };
                });
            };
        });
    };
});

export default router;