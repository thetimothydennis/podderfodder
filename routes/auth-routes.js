import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import { User } from '../models/user-schema.js';
import MailService from '@sendgrid/mail';

const SG_API_KEY = process.env.SENDGRID_API_KEY;

MailService.setApiKey(SG_API_KEY);

const router = express.Router();

router.post('/api/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/app'
    })
);

router.post('/api/register', async (req, res) => {
    if (req.body.password !== req.body.passwordMatch) {
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

router.post('/api/forgotpassword', async (req, res) => {
    let { email } = req.body;
    const token = (crypto.randomBytes)(20).toString('hex');
    const user = await User.findOneAndUpdate({email: email}, {resetPasswordToken: token});

    const resetEmail = {
        to: user.email,
        from: `donut-reply@timothyddennis.com`,
        subject: `password reset`,
        text: `
            You are receiving this because a password reset has been requested for your account.
            Please click on the following link, or paste into your browser to complete the process.
            ${process.env.LOCAL_BASE_URL}${process.env.PORT}/resetpassword/${token}
            If you didn't request a password, ignore this email and your password will remain unchanged
            `,
    };
    
    MailService.send(resetEmail)
        .then(response => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
        })
        .catch(error => {
            console.log(error);
        });

    res.redirect('/forgotpassword');
});

router.post('/api/resetpassword', (req, res) => {
    console.log(req.body);
    let { newpassword, newpassmatch } = req.body;
    if (newpassword !== newpassmatch) {
        res.send(`passwords don't match`);
    } else {
        res.redirect('/resetpassword');
    };
});

export default router;