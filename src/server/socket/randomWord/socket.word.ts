import { Socket } from "socket.io";
import { roomData } from "../store";

export async function sendGameData(socket: Socket, roomId: string) {
    const room = roomData.get(roomId);

    if (!room) {
        console.error(`Room ${roomId} not found`);
        return;
    };
    console.log("game data emitted: ", room);
    socket.emit("game-data", {
        scrambleWord: room.scrambleWord,
        defination: room.defination,
        partOfSpeech: room.partOfSpeech,
    });
}