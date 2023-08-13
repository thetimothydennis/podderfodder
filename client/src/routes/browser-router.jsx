import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesUi from "./routes.jsx";

import socketIO from "socket.io-client";
import { apiCall } from "../functions/api-call.jsx";

const socket = socketIO.connect(apiCall);

const toastify = (message) => {
	toast.error(message, {
		position: toast.POSITION.TOP_RIGHT
	});
};

function App() {
	useEffect(() => {
		socket.on("error", (arg) => {
			toastify(arg)
			console.log(arg)
			socket.off()
		});
	})

	return (
		<BrowserRouter>
			<RoutesUi />
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
