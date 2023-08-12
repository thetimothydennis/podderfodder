import React from "react";
import { func } from "prop-types";
import { Route, Routes } from "react-router-dom";
import MainUi from "../MainUi.jsx";
import { HomePage } from "../pages/home-page.jsx";
import { UserLogin } from "../pages/auth-views/login.jsx";
import UserRegister from "../pages/auth-views/register.jsx";
import { ChangePassword } from "../pages/auth-views/change-password.jsx";
import { ForgotPassword } from "../pages/auth-views/forgot-password.jsx";
import { ResetPassword } from "../pages/auth-views/reset-password.jsx";
import socketIO from "socket.io-client";
import { apiCall } from "../functions/api-call.jsx";

const socket = socketIO.connect(apiCall);

// main user interface component
export function RoutesUi() {
	// main frontend routes definition and render return
	return (
		<div>
			<Routes>
				{/* root route for unauthenticated acces */}
				<Route
					path="/"
					element={<HomePage />}
				/>
				{/* app route for authenticated access */}
				<Route
					path="/app"
					element={<MainUi />}
				/>
				{/* app route for logging in */}
				<Route
					path="/login"
					socket={socket}
					element={<UserLogin />}
				/>
				{/* app route for registering */}
				<Route
					path="/register"
					socket={socket}
					element={<UserRegister />}
				/>
				{/* app route for changing password */}
				<Route
					path="/changepassword"
					socket={socket}
					element={<ChangePassword />}
				/>
				{/* route for step 1 in forgot password workflow */}
				<Route
					path="/forgotpassword"
					socket={socket}
					element={<ForgotPassword />}
				/>
				{/* route for step 2 in forgot password workflow */}
				<Route
					path="/resetpassword/:token"
					socket={socket}
					element={<ResetPassword />}
				/>
			</Routes>
		</div>
	);
}

export default RoutesUi;
