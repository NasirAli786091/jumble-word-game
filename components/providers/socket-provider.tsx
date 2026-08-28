"use client"

import { createContext, useContext, useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider(
    { children }: { children: React.ReactNode }
) {
    const { status, data: session } = useSession();
    const registeredRef = useRef(false);

    useEffect(() => {
        if (status !== "authenticated") return;
        if(!session?.user?.id) return;

        if(!socket.connected){
            socket.connect();
        }
        
        const onConnect = () => {
            console.log("socket connected", socket.id);

            if(!registeredRef.current){
                socket.emit("register-user", session?.user?.id);
                registeredRef.current = true;
            }   
        }

        socket.on("connect", onConnect);
        return () => {
            socket.off("connect", onConnect);
        }
    }, [status, session]);

    useEffect(() => {
        if(status === "unauthenticated"){
            socket.disconnect();
            registeredRef.current = false;
        } 
    }, [status]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}