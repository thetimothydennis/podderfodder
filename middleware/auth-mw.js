import { Socket } from "../config/sockets.js";

export const socketMW = (req, res, next) => {
	let room = req.sessionID;
	let { messages } = req.session;
	if (messages !== undefined && messages.length > 0) {
		for (let message of messages) {
			Socket.emit("error", {
					message: message,
				}, room);
		};
		req.session.messages = [];
		next();
	} else {
		next();
	};
};