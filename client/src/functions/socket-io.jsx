import { apiCall } from "../functions/api-call.jsx";
import { io } from "socket.io-client";

export const socket = io(apiCall, {
    autoConnect: true
});