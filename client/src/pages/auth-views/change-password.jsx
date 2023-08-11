import React, { useEffect } from "react";

export function ChangePassword() {
	useEffect(() => { document.title = "Registration - Podder Fodder"; }, []);

	return (
		<div className="Epi">
			<h1>Change Password</h1>
			<form
				className="container"
				method="POST"
				action="/api/changepassword">
				<ul className="ruleList">
					Password requirements:
					<li className="ruleItem">between 7 and 15 characters</li>
					<li className="ruleItem">one uppercase letter</li>
					<li className="ruleItem">one lowercase letter</li>
					<li className="ruleItem">one numeric digit</li>
				</ul>
				<p className="row form-group">
					<label
						className="col-sm form-control"
						htmlFor="newpassword">
						new password
						<input
							className="col-sm form-control"
							type="password"
							name="newpassword"
							id="newpassword" />
					</label>
				</p>
				<p className="row form-group">
					<label
						className="col-sm form-control"
						htmlFor="newpassmatch">
						new password match
						<input
							className="col-sm form-control"
							type="password"
							name="newpassmatch"
							id="newpassmatch" />
					</label>
				</p>
				<button
					type="submit"
					className="btn btn-dark">
					Change password
				</button>
			</form>
		</div>
	);
}
