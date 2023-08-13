import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesUi from "./routes.jsx";

import { socket } from "../functions/socket-io.jsx";

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
		socket.connect();

		function onToastieEvent(value) {
			setToastie(value.message);
		};

		socket.on("error", onToastieEvent);

		return () => {
			setTimeout(() => {
				socket.off("error", onToastieEvent);
			}, 5000)
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
