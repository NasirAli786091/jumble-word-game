import { Server, Socket } from "socket.io";
import {
  matchmakingQueue,
  playerRooms,
} from "../store";
import { createRoomGame } from "../randomWord/createRoomData";
import { sendGameData } from "../randomWord/socket.word";

let roomCounter = 1;

export function handleMatchmaking(io: Server, socket: Socket) {
  socket.on("join-matchmaking", async () => {
    const userId = socket.data.userId;

    if (!userId) return;

    if(matchmakingQueue.some((s) => s.id === socket.id)) return;

    matchmakingQueue.push(socket);

    if (matchmakingQueue.length < 2) {
      socket.emit("waiting");
      return;
    }

    const p1 = matchmakingQueue.shift()!;
    const p2 = matchmakingQueue.shift()!;

    const roomId = `room-${roomCounter++}`;

    // 1. create game ONCE
    await createRoomGame(roomId, p1.data.userId, p2.data.userId);

    // 2. join room
    p1.join(roomId);
    p2.join(roomId);

    // 3. map users to room
    playerRooms.set(p1.data.userId, roomId);
    playerRooms.set(p2.data.userId, roomId);

    // 4. send game data using shared function
    await sendGameData(p1, roomId);
    await sendGameData(p2, roomId);

    // 5. notify client
    io.to(roomId).emit("match-found", {
      roomId,
      players: [
        { userId: p1.data.userId, socketId: p1.id },
        { userId: p2.data.userId, socketId: p2.id },
      ],
    });
  });
}