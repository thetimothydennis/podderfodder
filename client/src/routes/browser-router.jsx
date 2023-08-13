import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesUi from "./routes.jsx";

import { socket } from "../functions/socket-io.jsx";

function App() {
	return (
		<BrowserRouter>
			<RoutesUi socket={socket} />
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
