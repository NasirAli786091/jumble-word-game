"use client";

import { useMatchMaking } from "../hooks/useMatchMaking";
import { useRouter } from "next/navigation";
import BtnCom from "./BtnCom";
import { motion } from "framer-motion";
import { MovingLetters } from "@/components/ux/MovingLetters";

export default function FindMatchPage() {
    const router = useRouter();

    const {
        onlineUsers,
        searching,
        matchFound,
        findMatch,
        cancelMatch,
    } = useMatchMaking();

    return (
        <div
        style={{
            background: "var(--backgroundBG)"
        }}
        className="grid-texture h-screen flex flex-col">
            <div className="flex items-center justify-between p-3">
                <h1>Online Player(s): {onlineUsers.length}</h1>
                <BtnCom type="button" onClick={() => router.push("/home/profile")}>
                    Profile
                </BtnCom>
            </div>
            <div className="flex-1 flex flex-col-reverse sm:flex-row">
                <div className="w-full h-20 sm:max-w-[30%] sm:h-full flex items-center justify-center">
                    <div className="flex">
                        <BtnCom
                            type="button"
                            onClick={findMatch}
                            disabled={searching}
                        >
                            {matchFound ? "Match Found" : searching ? "Searching..." : "Find Match"}
                        </BtnCom>
                        {searching && (
                            <motion.div
                                animate={{
                                    x: 10
                                }}
                            >
                                <BtnCom onClick={cancelMatch}>X</BtnCom>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <MovingLetters />
                </div>
            </div>
        </div>
    )
}