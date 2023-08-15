import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesUi from "./routes.jsx";
import { Cookies } from "react-cookie";
import { apiCall } from "../functions/api-call.jsx";

import { socket } from "../functions/socket-io.jsx";
import { io } from "socket.io-client";

function toastify (arg) {
	return toast.error(arg, {
		position: toast.POSITION.TOP_RIGHT,
		className: "toastMessage",
		autoClose: 2500
	});
}

function App() {
	const [toastie, setToastie] = useState("")

	useEffect(() => {
		const socket = io(apiCall);
		const cookie = new Cookies();
		const sid = cookie.get("connect.sid");
		
		socket.io.on("connected", (socket) => {
			socket.join(sid)
			console.log(`joined ${sid}`)
		})

		function onToastieEvent(value) {
			setToastie(value.message);
		};

		socket.on("error", onToastieEvent);

		return () => {
			setTimeout(() => {
				socket.off("error", onToastieEvent);
			}, 2000)
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (toastie !== "") {
			toastify(toastie);
		}
	}, [toastie]);

	return (
		<BrowserRouter>
			<RoutesUi />
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
