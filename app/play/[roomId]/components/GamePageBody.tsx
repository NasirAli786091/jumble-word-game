"use client"

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import GamePageBox from "./GamePageBox";

type GamePageBodyProps = {
    leaveMatch: () => void;
};


export default function GamePageBody({ leaveMatch }: GamePageBodyProps) {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        const handleOnlineUsers = (users: string[]) => {
            setOnlineUsers(users);
        }

        socket.on("online-users", handleOnlineUsers);
        socket.emit("request-online-users");

        return () => {
            socket.off("online-users", handleOnlineUsers);
        };

    }, [socket]);
    return (
            <GamePageBox
                onlineUsers={onlineUsers}
                leaveMatch={leaveMatch}
            />
    )
}