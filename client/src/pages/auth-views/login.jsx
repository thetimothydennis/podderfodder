import React, { useEffect } from "react";
import Username from "../../components/form-parts/username";
import Password from "../../components/form-parts/password";
import GoogleButton from "../../components/buttons/google-button";
import GithubButton from "../../components/buttons/github-button";
import GoogleAcctNote from "../../components/text-blocks/goog-acct-note";

export function UserLogin() {
	useEffect(() => { document.title = "Login - Podder Fodder"; }, [])

	return (
		<div className="Epi">
			<h1>Podder Fodder Login</h1>
			<p>You must log in before accessing the platform.</p>
			<form
				className="container"
				method="POST"
				action="/api/login">
				<Username />
				<Password />
				<button
					type="submit"
					className="btn btn-dark">
					Login
				</button>
				<p>
					Don&apos;t have an account yet? Create one{" "}
					<a href="/register">here</a>.
				</p>
				<p>
					Forgot your password? Click{" "}
					<a href="/forgotpassword">here</a>.
				</p>
				<p>Or, you can login with one of these social providers:</p>
				<div className="row">
					<GithubButton />
					<GoogleButton />
				</div>
				<GoogleAcctNote />
			</form>
		</div>
	);
}
