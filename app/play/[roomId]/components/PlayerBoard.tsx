import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LettersCom from "./LettersCom";
import { WordData } from "../hooks/useGame";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Letters = {
    id: string;
    val: string;
};

type PlayerBoardProps = {
    userScore: number;
    word: WordData | null;
    handleMatchWord: () => void;
    letters: Letters[];
    setLetters: Dispatch<SetStateAction<Letters[]>>;
    wrongAnsStyle: boolean;
}

export default function PlayerBoard({ userScore, word, handleMatchWord, letters, setLetters, wrongAnsStyle }: PlayerBoardProps) {
    // useEffect(() => {
    //     if(!wrongAnsStyle) return;
    //     const timer = setTimeout(() => {
    //         wrongAnsStyle = false
    //     },1);

    //     return () => clearTimeout(timer);
    // }, [])
    return (
        <div className="flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-gray-500 gap-2">
            <div className="w-full flex items-center px-2 text-sm sm:text-md">
                <h1>Score: {userScore}</h1>
            </div>
            {/* game logic */}
            <LettersCom
                word={word}
                letters={letters}
                setLetters={setLetters}
                wrongAnsStyle={wrongAnsStyle}
            />
            <motion.div
                whileHover={{ scale: 0.86 }}
                className="sm:mb-2"
            >
                <Button
                    onClick={() => handleMatchWord()}
                    className={`w-auto h-8 font-bold text-md mb-5 cursor-pointer hover:bg-zinc-800 bg-transparent border-black text-white`}>
                    Submit
                </Button>
            </motion.div>
        </div>
    )
}