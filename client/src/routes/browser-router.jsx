import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesUi from "./routes.jsx";

function App() {
	return (
		<BrowserRouter>
			<RoutesUi />
		</BrowserRouter>
	);
}

export default App;
