"use client";

import { createContext, useContext, useEffect } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status, data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        if (status !== "authenticated" || !userId) return;

        const onConnect = () => {
            console.log("Socket connected:", socket.id);
            socket.emit("register-user", userId);
        };

        const onConnectError = (error: Error) => {
            console.error("Socket connection error:", error.message);
        };

        socket.on("connect", onConnect);
        socket.on("connect_error", onConnectError);

        if (socket.connected) {
            onConnect();
        } else {
            socket.connect();
        }

        return () => {
            socket.off("connect", onConnect);
            socket.off("connect_error", onConnectError);
        };
    }, [status, userId]);

    useEffect(() => {
        if (status === "unauthenticated") {
            socket.disconnect();
        }
    }, [status]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}