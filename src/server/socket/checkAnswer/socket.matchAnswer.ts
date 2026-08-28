import { Server, Socket } from "socket.io";
import { playerRooms, roomData } from "../store";
import { updateRoomWord } from "./updateRoomWord";
import { updateGameStats } from "@/lib/user";

export function handleAnswer(io: Server, socket: Socket) {
    socket.on("check-answer", async ({ word }) => {
        console.log("event emitter check-answer");

        const userId = socket.data.userId;
        console.log("userId:", userId);

        const roomId = playerRooms.get(userId);
        console.log("roomId:", roomId);

        if (!roomId){
            console.log("NO ROOM ID - RETURNING");
            return;
        }

        const room = roomData.get(roomId);
        console.log("room:", room);

        if (!room){
            console.log("NO ROOM DATA - RETURNING");
            return;
        } 

        if (word.toLowerCase() !== room.answer.toLowerCase()) {
            socket.emit("wrong-answer");
            return;
        }

        room.scores[userId] += 1;


        console.log("Current round:", room.round);
        console.log("Max round:", room.maxRound);
        console.log("Scores:", room.scores);

        //last round?
        if (room.round >= room.maxRound) {
            const players = Object.keys(room.scores);

            const p1 = players[0];
            const p2 = players[1];

            let winner = null;

            if (room.scores[p1] > room.scores[p2]) {
                winner = p1;

            } else if (room.scores[p2] > room.scores[p1]) {
                winner = p2;
            }

            console.log("GAME FINISHED");
            console.log("p1:", p1);
            console.log("p2:", p2);
            console.log("winner:", winner);

            // update db of both players
            await updateGameStats(p1, p2, winner);

            io.to(roomId).emit("game-over", {
                scores: room.scores,
                winner, //null = draw
            })

            return;
        }

        // next round
        room.round += 1;

        const updatedRoom = await updateRoomWord(roomId);

        if (!updatedRoom) return;

        io.to(roomId).emit("next-round", {
            round: updatedRoom.round,
            scrambleWord: updatedRoom.scrambleWord,
            defination: updatedRoom.defination,
            partOfSpeech: updatedRoom.partOfSpeech,
            scores: updatedRoom.scores,
        })

        console.log("updated data: ", room);
    })
}