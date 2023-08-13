/* eslint-disable no-console */
import { config } from "dotenv";
config({ path: `./.env.${process.env.NODE_ENV}` });

import { createServer } from "http";
import { createServer as createHTTPSServer } from "https";
// import { Server } from "socket.io";
import { io } from "./config/sockets.js";

import app from "./index.js";
import httpApp from "./httpApp.js";
import { ssl_options } from "./config/certs.js";

// imports port environment variables for https and http servers
const PORT = process.env.PORT;
const httpPORT = process.env.HTTP_PORT;

// starts the http redirect server
if (process.env.NODE_ENV === "prod") {
	createServer(httpApp).listen(httpPORT, () => {
		console.log(`http app listening on port ${httpPORT}`);
	});
} else {
	createServer(app).listen(httpPORT, () => {
		console.log(`app listening on port ${httpPORT}`);
	});
}

const httpsServer = createHTTPSServer(ssl_options, app)

io.attach(httpsServer);

// starts the https server
httpsServer.listen(PORT, () => {
	console.log(`app listening on port ${PORT}`);
});
