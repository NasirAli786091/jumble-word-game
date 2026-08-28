"use client"

import { motion } from "framer-motion";
import { useGame } from "../hooks/useGame";
import GameOverModal from "./GameOverModal";
import WordInfo from "./WordInfo";
import PlayerBoard from "./PlayerBoard";
import OpponentBoard from "./OpponentBoard";
import AnimatedSwap from "../animate/AnimatedSwap";

type MainBodyProps = {
    onlineUsers: string[];
    leaveMatch: () => void;
};

export default function GamePageBox({ onlineUsers, leaveMatch }: MainBodyProps) {
    const {
        userId,
        round,
        gameOver,
        word,
        userScore,
        opponentScore,
        handleMatchWord,
        letters,
        setLetters,
        wrongAnsStyle,
    } = useGame();

    return (
        <div className="flex-1 flex flex-col gap-2">
            <GameOverModal
                gameOver={gameOver}
                userId={userId}
            />

            <div className="flex items-center justify-between">
                <h1>Online: <span>{onlineUsers.length}</span></h1>
                <span className="font-bold sm:m-auto">Round: {round}</span>
            </div>

            <div className="flex-1 flex flex-col border border-zinc-500 rounded-xl">
                {/* top section */}
                <AnimatedSwap swapKey={round} variant="fade-up">
                    <WordInfo word={word} />
                </AnimatedSwap>

                {/* bottom section */}
                <div className="flex-1 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">

                    {/* left section */}
                    <PlayerBoard
                        userScore={userScore}
                        word={word}
                        letters={letters}
                        setLetters={setLetters}
                        handleMatchWord={handleMatchWord}
                        wrongAnsStyle={wrongAnsStyle}
                    />

                    {/* right section */}
                    <OpponentBoard
                        opponentScore={opponentScore}
                        word={word}
                    />
                </div>

            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                className="border border-gray-800 py-[5.4px] rounded cursor-pointer w-40 self-center font-bold"
                onClick={leaveMatch}
            >
                Leave Match
            </motion.button>
        </div>
    )
}