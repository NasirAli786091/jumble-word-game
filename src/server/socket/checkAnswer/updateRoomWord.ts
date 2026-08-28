import { getRandomWord } from "@/lib/GPT/generateWord";
import { roomData } from "../store";
import { safeShuffleWord } from "../randomWord/jumbleWord";

export async function updateRoomWord(roomId: string) {
    const room = roomData.get(roomId);

    if(!room) return;

    const newWord = await getRandomWord();

    room.answer = newWord.word;
    room.scrambleWord = safeShuffleWord(newWord.word);
    room.defination = newWord.definition;
    room.partOfSpeech = newWord.part_of_speech;

    console.log("updated room data: ",room);
    return room;
}