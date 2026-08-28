import { Server, Socket } from "socket.io";
import { handleUsers } from "./users/socket.user";
import { handleMatchmaking } from "./matchmaking/socket.matchmaking";
import { handleRoom } from "./room/socket.room";
import { handleDisconnect } from "./disconnect/socket.disconnect";
import { handleAnswer } from "./checkAnswer/socket.matchAnswer";

export function setupSocket(io: Server){
    io.on("connection", (socket: Socket) => {
        console.log("Socket Connected: ", socket.id);

        handleUsers(io, socket);
        handleMatchmaking(io, socket);
        handleRoom(io, socket);
        handleDisconnect(io, socket);
        handleAnswer(io, socket);
    })
}