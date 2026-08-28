"use client";

import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useOpponentDisconnect(roomId: string){
    const router = useRouter();

    const [opponentGone, setOpponentGone] = useState(false);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if(!socket || !roomId) return;

        const handleOpponentLeft = () => {
            setOpponentGone(true);

            let remaining = 3;

            const interval = setInterval(() => {
                remaining--;

                setCountdown(remaining);

                if (remaining <= 0) {
                    clearInterval(interval);
                    router.push("/play/find-match");
                }
            }, 1000);
        };

        socket.emit("join-room", roomId);
        socket.on("opponent-left", handleOpponentLeft);

        return () => {
            socket.off("opponent-left", handleOpponentLeft);
        };
    }, [roomId, router]);

    const leaveMatch = () => {
        socket.emit("leave-room", roomId);
        router.push("/home/profile");
    };

    return {
        opponentGone,
        countdown,
        leaveMatch,
    };
}