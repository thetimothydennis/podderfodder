import { checkEmail } from "email-validator-node";
import { User } from "../models/user-schema.js";

function testPassword(password) {
	return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/);
};

export function passwordSuite(password, passmatch) {
    let passObj = { passPasses: true };
    let testPass = testPassword(password);
    if (password !== passmatch) {
        passObj.passPasses = false;
        passObj.message = "Passwords don't match."
    } else if (testPass === null) {
        passObj.passPasses = false;
        passObj.message = "Password not strong enough."
    };
    return passObj;
};

export async function emailDBCheck(email) {
	let emailCheckObj = {
		emailExists: false
	};
	try {
		let existingEmail = await User.find({email: email});
		if (!existingEmail || existingEmail.length === 0) {
			emailCheckObj.message = "Email not found."
		} else if (existingEmail || existingEmail.length > 0) {
			emailCheckObj.emailExists = true;
			emailCheckObj.message = "Email already in use."
		}; 
	} catch (err) {
		emailCheckObj.message = "Couldn't check db"
	};
	return emailCheckObj;
};

export function testAccount(password, passmatch, email, username, name) {
	let emailExists = emailDBCheck(email);
	let signUpObj = { detailsOkay: true, };
    let testPass = passwordSuite(password, passmatch);
	let verifyEmail = checkEmail(email);
	if (!email) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "Email required."
	} else if (!name) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "Name is required."
	} else if (!username) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "Username is required."
	} else if (testPass.passPasses === false) {
        signUpObj.detailsOkay = false;
        signUpObj.message = testPass.message;
    } else if (verifyEmail.isValid === false) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "Email isn't valid."
	} else if (emailExists.emailExists === true){
		signUpObj.detailsOkay = false;
		signUpObj.message = emailExists.message;
	};
	return signUpObj;
};