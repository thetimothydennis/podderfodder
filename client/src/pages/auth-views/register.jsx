import React, { useEffect, useState } from "react";
import { string, func } from "prop-types";
import PasswordReqs from "../../components/text-blocks/password-reqs";
import PasswordWarn from "../../components/text-blocks/password-warn";
import RegistrationNotice from "../../components/text-blocks/registration-notice";
import PassMatch from "../../components/form-parts/pass-match";
import Password from "../../components/form-parts/password";
import Username from "../../components/form-parts/username";
import Email from "../../components/form-parts/email";
import Name from "../../components/form-parts/name";
import { toast } from "react-toastify";

function toastify (arg) {
	return toast.error(arg, {
		position: toast.POSITION.TOP_RIGHT,
		className: "toastMessage"
	});
}

function UserRegister({ socket }) {
	const [isConnected, setIsConnected] = useState(socket.connected)
	const [toastie, setToastie] = useState("")

	useEffect(() => { document.title = "Registration - Podder Fodder"; }, []);

	useEffect(() => {
		socket.connect();
		function onConnect() { setIsConnected(true); }

		function onDisconnect() { setIsConnected(false); }

		function onToastieEvent(value) { setToastie(value.message); };

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("error", onToastieEvent);

		return () => {
			setTimeout(() => {
				socket.off("connect", onConnect);
				socket.off("disconnect", onDisconnect);
				socket.off("error", onToastieEvent);
			}, 5000)
			socket.disconnect();
		}}, [])

	useEffect(() => {
		console.log(toastie + " made it to register")
		if (toastie !== "") { toastify(toastie); }
	},[toastie]);

	return (
		<div>
			<h1>Podder Fodder Registration</h1>
			<RegistrationNotice />

			<div className="Epi">
				<form
					className="container"
					method="POST"
					action="/api/register">
					<Name />
					<Email />
					<Username />
					<PasswordReqs />
					<Password />
					<PassMatch />
					<button
						type="submit"
						className="btn btn-dark">
						Register
					</button>
				</form>
			</div>
			<PasswordWarn />
		</div>
	);
}

UserRegister.propTypes = {
	toastie: string,
	socket: func
}

export default UserRegister;