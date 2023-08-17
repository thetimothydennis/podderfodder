import passport from "passport";
import { randomBytes } from "crypto";
import MailService from "@sendgrid/mail";
import { configurePassport } from "../config/passport.js";
import { User } from "../models/user-schema.js";
import { errHandler } from "../functions/err-handler.js";
import { Socket } from "../config/sockets.js";
import { testAccount, passwordSuite } from "../functions/auth-functions.js";

configurePassport(passport);

MailService.setApiKey(process.env.SENDGRID_API_KEY);

function handlePassportLogin(strategy) {
	return passport.authenticate(strategy, {
		faliureRedirect: "/login",
		successRedirect: "/app",
	});
}

// github login handlers
export const handleGithubCallback = handlePassportLogin("github");
export const handleGithubLogin = passport.authenticate("github");

// google login handlers
export const handleGoogleCallback = handlePassportLogin("google");
export const handleGoogleLogin = passport.authenticate("google", {
	scope: ["profile", "email"],
});

// local user login handler
export const postLogin = passport.authenticate("local", {
	failureMessage: true,
	failureRedirect: "/login",
	successRedirect: "/app",
});

// local user registration handler
export const postRegister = async (req, res) => {
	try {
		let room = req.sessionID;
		let { email, password, passmatch, username, name } = req.body;
		let testDetails = await testAccount(
			password, 
			passmatch, 
			email, 
			username, 
			name
			)
		if (testDetails.detailsOkay === false) {
			Socket.emit("error", {
				message: testDetails.message
			}, room);
			res.redirect("/register");
			return;
		} else {
			const user = new User({
				username: username,
				email: email,
				name: name,
			});
			User.register(user, password, (err) => {
				if (err) {
					Socket.emit("error", {
						message: err.message
					}, room)
					res.redirect("/register");
					return;
				}
				res.redirect("/app");
			});
		}
	} catch (err) { errHandler(err, res);}
};

// get user data for frontend handler
export const getUserData = (req, res) => {
	if (req.user === undefined) {
		res.json({});
	} else {
		res.json({ user_id: req.user._id });
	}
};

// user logout handler
export const getLogout = (req, res) => {
	req.session.destroy();
	req.logout(() => { res.redirect("/"); });
};

// handler for changing authenticated local user password
export const postChangePassword = async (req, res) => {
	try {
		let room = req.sessionID;
		let { username } = req.user;
		let { password, passmatch } = req.body;
		let testPassword = passwordSuite(password, passmatch);
		if (testPassword.passPasses === false) {
			Socket.emit("error", {
				message: testPassword.message
			}, room);
			res.redirect("/changepassword");
		} else {
			let updateUser = await User.findOne({ username: username });
			updateUser.setPassword(password, async () => {
				await updateUser.save().then(() => {
					req.session.destroy();
					req.logout(() => {
						Socket.emit("success", {
								message: "password changed, please login",
							}, room);
						setTimeout(() => {
							res.redirect("/login");
						}, 2000);
					});
				});
			});
		}
	} catch (err) {
		errHandler(err, res);
	}
};

// handler for initiating forgotten password reset
export const postForgotPassword = async (req, res) => {
	try {
		let room = req.sessionID;
		let { email } = req.body;
		const checkUser = await User.findOne({ email: email });
		if (!checkUser || checkUser.length === 0) {
			Socket.emit("error", { 
				message: "couldn't find email address"
		}, room);
			res.redirect("/forgotpassword");
		} else {
			const token = randomBytes(20).toString("hex");
			const user = await User.findOneAndUpdate(
				{ email: email },
				{ resetPasswordToken: token },
			);

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
				html: `
					<h1><strong>Hello from PodderFodder!</strong></h1><br />
					<p>You are receiving this email because a password reset has been requested for your account.<br /><br />
					<a href="${process.env.LOCAL_BASE_URL}${process.env.PORT}/resetpassword/${token}" target="_blank">
					Click here to change your password.
					</a><br />
					<br />If you didn't request a password, ignore this email and your password will remain unchanged</p>
					`,
			};

			MailService.send(resetEmail)
				.then((response) => {
					// eslint-disable-next-line no-console
					console.log(response[0].statusCode);
					// eslint-disable-next-line no-console
					console.log(response[0].headers);
				})
				.catch((error) => {
					// eslint-disable-next-line no-console
					console.log(error);
				});
			Socket.emit("success", {
					message: "Check your email for a reset link",
				}, room);
			res.redirect("/login");
		}
	} catch (err) {errHandler(err, res);}
};

// handler for resetting password from tokenized link
export const postResetPassword = async (req, res) => {
	try {
		let room = req.sessionID;
		let { token } = req.params;
		let { password, passmatch } = req.body;
		let testResetPass = passwordSuite(password, passmatch);
		let user = await User.find({ resetPasswordToken: token });
		let username = user[0].username;
		let updateUser;
		if (user.length === 0) {
			Socket.emit( "error", {
					message: "account not found",
				}, room);
			res.redirect(`/forgotpassword`);
		} else if (testResetPass.passPasses === false) {
			Socket.emit("error", {
					message: testResetPass.message,
				}, room);
			res.redirect(`/resetpassword/${token}`);
		} else {
			updateUser = await User.findOne({ username: username });
			updateUser.setPassword(password, async () => {
				await updateUser.save();
			});
			await User.findOneAndUpdate(
				{ username: username },
				{ resetPasswordToken: "" },
			);
			Socket.emit("success", {
					message: "password reset, please login",
				}, room);
			setTimeout(() => {
				res.redirect("/login");
			}, 2000);
		}
	} catch (err) {
		errHandler(err, res);
	}
};
