import { apiCall } from "../functions/api-call.jsx";
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(apiCall, {
    withCredentials: true
});