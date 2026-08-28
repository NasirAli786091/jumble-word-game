import { Server, Socket } from "socket.io";
import {
    disconnectedPlayers,
    onlineUsers,
    playerRooms,
} from "../store";
import { sendGameData } from "../randomWord/socket.word";

export function handleUsers(io: Server, socket: Socket) {

    function emitOnlineUsers() {
        io.emit("online-users", Array.from(onlineUsers.keys()));
    }

    socket.on("register-user", async (userId: string) => {
        if (!userId) return;

        socket.data.userId = userId;
        onlineUsers.set(userId, socket.id);

        const roomId = playerRooms.get(userId);
        const reconnectTimer = disconnectedPlayers.get(userId);

        // clear disconnect timeout if exists
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            disconnectedPlayers.delete(userId);
        }

        if(roomId) {
            socket.join(roomId);

            await sendGameData(socket, roomId);

            // notify other player
            socket.to(roomId).emit("player-reconnected", {
                userId,
            });

            socket.emit("reconnected", { roomId });
        }

        emitOnlineUsers();
    });

    socket.on("request-online-users", () => {
        emitOnlineUsers();
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        emitOnlineUsers();
    });
}