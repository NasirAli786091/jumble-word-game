import { useSocket } from "@/components/providers/socket-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useMatchMaking(){
    const socket = useSocket();
    const router = useRouter();

    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [searching, setSearching] = useState(false);
    const [matchFound, setMatchFound] = useState(false);

    useEffect(() => {
        const handleOnlineUsers = (users: string[]) => {
            setOnlineUsers(users);
        }

        const handleMatchFound = (data: { roomId: string }) => {
            setMatchFound(true);
            setSearching(false);

            setTimeout(() => {
                router.push(`/play/${data.roomId}`);
            }, 2000)
        }

        socket.on("online-users", handleOnlineUsers);
        socket.on('match-found', handleMatchFound);

        socket.emit("request-online-users");

        return () => {
            socket.off("online-users", handleOnlineUsers);
            socket.off("match-found", handleMatchFound);
        }

    }, [socket, router])

    const findMatch = () => {
        setSearching(true);
        socket.emit("join-matchmaking");
    }

    const cancelMatch = () => {
        socket.emit("cancel-matchmaking");
        setSearching(false);
    }
    
    return {
        onlineUsers,
        searching,
        matchFound,
        findMatch,
        cancelMatch,
    }
}