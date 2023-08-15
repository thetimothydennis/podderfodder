import { Server } from "socket.io";

const io = new Server();

const Socket = {
	emit: (event, data, room) => {
		setTimeout(() => {
			io.to(room).emit(event, data);
		}, 500);
	},
};

io.on("connection", (socket) => {
	let sid = socket.handshake.headers.cookie;
	let sidArr = sid.split(" ");
	let isolatedSid = sidArr.find((cookie) =>
		cookie.match(/[connect.sid=].{36}/),
	);
	let roomArr = isolatedSid.split("=");
	let untrimmedRoom = roomArr[1];
	let room = untrimmedRoom.slice(4, 36);
	socket.join(room);
});

export { Socket };
export { io };
