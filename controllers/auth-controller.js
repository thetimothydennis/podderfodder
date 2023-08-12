import passport from "passport";
import { configurePassport } from "../config/passport.js";
import { User } from "../models/user-schema.js";
import { randomBytes } from "crypto";
import { checkEmail } from "email-validator-node";
import MailService from "@sendgrid/mail";
import { errHandler } from "../functions/err-handler.js";
import { io } from "../server.js";

configurePassport(passport);

MailService.setApiKey(process.env.SENDGRID_API_KEY);

function testPassword(password) {
	return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/);
}

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
export const postLogin = handlePassportLogin("local");

// local user registration handler
export const postRegister = async (req, res) => {
	try {
		let { email, password, passmatch, username, name } = req.body;
		let verifyEmail = await checkEmail(email);
		let testPass = testPassword(password);
		if (
			password !== passmatch ||
			verifyEmail.isValid === false ||
			testPass === null
		) {
			io.on("connect", (socket) => {
				socket.emit("error", "bad registration information")
			})
			res.redirect("/register");
		} else {
			const user = new User({
				username: username,
				email: email,
				name: name,
			});
			User.register(user, password, (err) => {
				if (err) {
					res.redirect("/register");
					return;
				}
				res.redirect("/app");
			});
		}
	} catch (err) {
		errHandler(err, res);
	}
};

// get user data for frontend handler
export const getUserData = (req, res) => {
	if (req.user === undefined) {
		res.json({});
	} else {
		res.json({
			user_id: req.user._id,
		});
	}
};

// user logout handler
export const getLogout = (req, res) => {
	req.session.destroy();
	req.logout(() => {
		res.redirect("/");
	});
};

// handler for changing authenticated local user password
export const postChangePassword = async (req, res) => {
	try {
		let { username } = req.user;
		let { password, passmatch } = req.body;
		let testNewPass = testPassword(password);
		if (password !== passmatch || testNewPass === null) {
			res.redirect("/changepassword");
		} else {
			let updateUser = await User.findOne({ username: username });
			updateUser.setPassword(password, async () => {
				await updateUser.save();
				req.session.destroy();
				req.logout(() => {
					res.redirect("/login");
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
		let { email } = req.body;
		const token = randomBytes(20).toString("hex");
		const user = await User.findOneAndUpdate(
			{ email: email },
			{ resetPasswordToken: token }
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

		res.redirect("/login");
	} catch (err) {
		errHandler(err, res);
	}
};

// handler for resetting password from tokenized link
export const postResetPassword = async (req, res) => {
	try {
		let { token } = req.params;
		let { password, passmatch } = req.body;
		let testResetPass = testPassword(password);
		let user = await User.find({ resetPasswordToken: token });
		let username = user[0].username;
		let updateUser;
		if (user.length === 0) {
			res.redirect(`/forgotpassword`);
		} else if (password !== passmatch || testResetPass === null) {
			res.redirect(`/api/resetpassword/${token}`);
		} else {
			updateUser = await User.findOne({ username: username });
			updateUser.setPassword(password, async () => {
				await updateUser.save();
			});
			await User.findOneAndUpdate(
				{ username: username },
				{ resetPasswordToken: "" }
			);
			res.redirect("/login");
		}
	} catch (err) {
		errHandler(err, res);
	}
};
