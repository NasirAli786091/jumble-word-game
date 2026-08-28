import { getRandomWord } from "@/lib/GPT/generateWord";
import { roomData } from "../store";
import { safeShuffleWord } from "./jumbleWord";

export async function createRoomGame(roomId: string, player1Id: string, player2Id: string){    
    const word = await getRandomWord();

    roomData.set(roomId, {
        answer: word.word,
        scrambleWord: safeShuffleWord(word.word),
        defination: word.definition,
        partOfSpeech: word.part_of_speech,
        scores: {
            [player1Id]: 0,
            [player2Id]: 0,
        },
        round: 1,
        maxRound: 5,
    });
}