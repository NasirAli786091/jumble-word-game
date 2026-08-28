import { Server, Socket } from "socket.io";
import { playerRooms } from "../store";
import { sendGameData } from "../randomWord/socket.word";

export function handleRoom(io: Server, socket: Socket) {
    socket.on("join-room", async (roomId: string) => {
        const userId = socket.data.userId;

        if(!userId || !roomId) return;

        socket.join(roomId);

        playerRooms.set(userId, roomId);
        
        await sendGameData(socket, roomId);

    })

    socket.on("leave-room", (roomId: string) => {
        const userId = socket.data.userId;

        socket.leave(roomId);

        if(userId){
            playerRooms.delete(userId);
        }

        socket.to(roomId).emit("opponent-left", {
            playerId: socket.id,
            userId: socket.data.userId,
        });
    });
}