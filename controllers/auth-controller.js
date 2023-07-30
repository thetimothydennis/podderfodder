import passport from 'passport';
import { User } from '../models/user-schema.js';
import crypto from 'crypto';
import { checkEmail, isEmailFormatValid, isMXRecordValid, isBlacklisted } from 'email-validator-node';
import MailService from '@sendgrid/mail';
import { errHandler } from '../functions/err-handler.js';

MailService.setApiKey(process.env.SENDGRID_API_KEY);

function testPassword (password) {
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/);
}

// user login handler
export const postLogin = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/app'
});

// user registration handler
export const postRegister = async (req, res) => {
    try {
        let verifyEmail = await checkEmail(req.body.email);
        let testPass = testPassword(req.body.password);
        if ((req.body.password !== req.body.passwordMatch) || (verifyEmail.isValid === false) || (testPass === null)) {
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
    }
    catch (err) {
        errHandler(err, res);
    };
};

// user logout handler
export const getLogout = (req, res) => {
    req.session.destroy();
    req.logout(() => {
        res.redirect("/");
    });
};

// get user data for frontend handler
export const getUserData = (req, res) => {
    if (req.user === undefined) {
        res.json({})
    } else {
        res.json({
            user_id: req.user._id
        })
    };
};

// handler for changing authenticated user password
export const postChangePassword = async (req, res) => {
    try {
        let { username, oldpassword, newpassword, newpassmatch } = req.body;
        let testNewPass = testPassword(newpassword)
        if ((newpassword !== newpassmatch) || (testNewPass === null)) {
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
    }
    catch (err) {
        errHandler(err, res);
    };
};

// handler for initiating forgotten password reset
export const postForgotPassword = async (req, res) => {
    try {
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
                `
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
    }
    catch (err) {
        errHandler(err, res);
    };
};

// handler for resetting password from tokenized link
export const postResetPassword = async (req, res) => {
    try {
        let { token } = req.params;
        let { newpassword, newpassmatch } = req.body;
        let testResetPass = testPassword(newpassword);
        let user = await User.find({resetPasswordToken: token});
        let username = user[0].username;
        let updateUser;
        if (user.length === 0) {
            res.redirect(`/forgotpassword`)
        } else if ((newpassword !== newpassmatch) || (testResetPass === null)) {
            res.redirect(`/api/resetpassword/${token}`)
        } else {
            updateUser = await User.findOne({username: username});
            updateUser.setPassword(newpassword, async () => {
                await updateUser.save();
            }); 
            await User.findOneAndUpdate({username: username}, {resetPasswordToken: ''});
            res.redirect('/login');
        };
    }
    catch (err) {
        errHandler(err, res);
    };
};