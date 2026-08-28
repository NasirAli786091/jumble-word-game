import { Server, Socket } from "socket.io";
import {
  onlineUsers,
  matchmakingQueue,
  playerRooms,
  disconnectedPlayers,
} from "../store";

export function handleDisconnect(io: Server, socket: Socket) {
  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);

    const queueIndex = matchmakingQueue.findIndex(
      s => s.id === socket.id
    );

    if (queueIndex !== -1) {
      matchmakingQueue.splice(queueIndex, 1);
    }

    const userId = socket.data.userId;
    if(!userId) return;
    const roomId = playerRooms.get(userId);
    if(!roomId) return;

    if (roomId) {
      socket.to(roomId).emit("player-disconnected", {
        playerId: socket.id,
        userId,
      });
      const timer = setTimeout(() => {
        socket.to(roomId).emit("opponent-left", {
          playerId: socket.id,
          userId,
        });

        playerRooms.delete(userId);
        disconnectedPlayers.delete(userId);

        console.log(`${userId} did not reconnect`)
      }, 10000)
      disconnectedPlayers.set(userId, timer);
    }

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
}