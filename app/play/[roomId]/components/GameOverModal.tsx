"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GameOverData } from "../hooks/useGame";
import { useEffect, useState } from "react";

interface GameOverModalProps {
    gameOver: GameOverData | null;
    userId?: string;
    totalTime?: number;
}
export default function GameOverModal({
    gameOver,
    userId,
    totalTime = 5,
}: GameOverModalProps) {
    const [time, setTime] = useState(totalTime);

    useEffect(() => {
        if(!gameOver) return;

        setTime(totalTime);
        
        const interval = setInterval(() => {
            setTime((prev) => {
                if(prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameOver, totalTime]);

    const isDraw = gameOver?.winner === null;
    const isWinner = gameOver?.winner === userId;

    const heading = isDraw
        ? "It's a Draw"
        : isWinner
            ? "You Won!"
            : "Opponent Won";

    const accent = isDraw
        ? {
            text: "text-amber-600",
            ring: "stroke-amber-500",
            badgeBg: "bg-amber-100",
            badgeBorder: "border-amber-300",
        }
        : isWinner
            ? {
                text: "text-emerald-600",
                ring: "stroke-emerald-500",
                badgeBg: "bg-emerald-100",
                badgeBorder: "border-emerald-300",
            }
            : {
                text: "text-red-600",
                ring: "stroke-red-500",
                badgeBg: "bg-red-100",
                badgeBorder: "border-red-300",
            }

    const emoji = isDraw ? "🤝" : isWinner ? "🏆" : "💀";

    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const progress = time / totalTime;

    return (
        <>
            <AnimatePresence>
                {gameOver && (

                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm text-black flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.div
                            className="bg-[linear-gradient(160deg,#fbf4e6,#f3ead9_60%,#ead9b8)] border border-zinc-500 rounded-xl px-10 py-8 flex flex-col items-center gap-4 shadow-2xl"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <div
                                className={`w-16 h-16 rounded-full border-2 ${accent.badgeBorder} ${accent.badgeBg} flex items-center justify-center text-3xl`}
                            >
                                {emoji}
                            </div>

                            <h1 className={`text-2xl font-bold ${accent.text}`}>
                                {heading}
                            </h1>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="relative w-12 h-12">
                                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 52 52">
                                        <circle
                                            cx="26"
                                            cy="26"
                                            r={radius}
                                            fill="none"
                                            strokeWidth="4"
                                            className="stroke-zinc-300"
                                        />
                                        <motion.circle
                                            cx="26"
                                            cy="26"
                                            r={radius}
                                            fill="none"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            className={accent.ring}
                                            strokeDasharray={circumference}
                                            initial= {{strokeDashoffset: circumference}}
                                            animate={{
                                                strokeDashoffset: circumference * (1 - progress),
                                            }}
                                            transition={{ duration: 1, ease: "linear" }}
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                        {time}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-700">
                                    Redirecting to lobby...
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}