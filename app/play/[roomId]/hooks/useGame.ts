"use client";

import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type WordData = {
    scrambleWord: string;
    partOfSpeech: string;
    defination: string;
    round?: number;
};

export type ScoreData = {
    scores: Record<string, number>;
}

export type GameOverData = {
    winner: string | null;
    scores: Record<string, number>;
}

type Letters = {
    id: string;
    val: string;
};


export function useGame() {
    const session = useSession();
    const router = useRouter();
    const userId = session.data?.user.id;
    const [round, setRound] = useState(1);
    const [word, setWord] = useState<WordData | null>(null);
    const [wrongAnsStyle, setWrongAnsStyle] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState<number | 0>(0);
    const [gameOver, setGameOver] = useState<GameOverData | null>(null);
    const [letters, setLetters] = useState<Letters[]>([]);

    const handleMatchWord = () => {
        console.log("letters: ", letters);
        const answer = letters.map((v) => v.val).join("");
        console.log("answer: ", answer);
        socket.emit("check-answer", {
            word: answer,
        });
    }

    useEffect(() => {
        if (!userId) return;

        const handleGameData = (data: WordData) => {
            setWord(data);
            if(data.round) setRound(data.round);
        }

        const handleNextRound = (data: WordData & ScoreData) => {
            setWord(data);
            setRound(data.round ?? 1);

            const myScore = data.scores[userId!];
            const opponentEntry = Object.entries(data.scores).find(
                ([id]) => id !== userId
            );

            setUserScore(myScore ?? 0);
            setOpponentScore(opponentEntry?.[1] ?? 0);
        }

        const handleWrongAnswer = () => {
            setWrongAnsStyle(true);
            setTimeout(() => {
                setWrongAnsStyle(false);
            }, 2000);
        }

        const handleGameOver = (data: any) => {
            setGameOver(data);
            setTimeout(() => {
                router.push("/play/find-match");
            }, 5000)
        }

        socket.on("game-data", handleGameData);
        socket.on("next-round", handleNextRound);
        socket.on("wrong-answer", handleWrongAnswer);
        socket.on("game-over", handleGameOver);

        return () => {
            socket.off("game-data", handleGameData);
            socket.off("next-round", handleNextRound);
            socket.off("wrong-answer", handleWrongAnswer);
            socket.off("game-over", handleGameOver);
        }
    }, [socket, userId]);

    return {
        userId,
        round,
        word,
        wrongAnsStyle,
        userScore,
        opponentScore,
        gameOver,
        handleMatchWord,
        letters,
        setLetters,
    }
}