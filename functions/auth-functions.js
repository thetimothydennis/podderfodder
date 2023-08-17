import { checkEmail } from "email-validator-node";
import { User } from "../models/user-schema.js";

function testPassword(password) {
	return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,15}$/);
}

export function passwordSuite(password, passmatch) {
    let passObj = { passPasses: true };
    let testPass = testPassword(password);
    if (password !== passmatch) {
        passObj.passPasses = false;
        passObj.message = "passwords don't match"
    } else if (testPass === null) {
        passObj.passPasses = false;
        passObj.message = "password not strong enough"
    }
    return passObj;
}

export async function testAccount(password, passmatch, email, username, name) {
	let emailExists = await User.find({email: email});
	let signUpObj = { detailsOkay: true, };
    let testPass = passwordSuite(password, passmatch);
	let verifyEmail = checkEmail(email);
	if (!email) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "email required"
	} else if (!name || !username) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "name and username are required"
	} else if (testPass.passPasses === false) {
        signUpObj.detailsOkay = false;
        signUpObj.message = testPass.message;
    } else if (verifyEmail.isValid === false) {
		signUpObj.detailsOkay = false;
		signUpObj.message = "email isn't valid"
	} else if (emailExists.length > 0){
		signUpObj.detailsOkay = false;
		signUpObj.message = "email already in use"
	};
	return signUpObj;
}