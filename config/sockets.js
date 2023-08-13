import { Server } from "socket.io";

const io = new Server();

const Socket = {
    emit: (event, data) => {
        console.log(event, data);
        setTimeout(() => {
            io.emit(event, data);
        }, 500)
    }
}

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on("disconnect", () => {
        console.log(`user disconnected`);
    })
});

// io.on("disconnect", (socket) => {
//     console.log(`user ${socket.id} disconnected`);
// });

export { Socket };
export { io };