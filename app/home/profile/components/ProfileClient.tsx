"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


import defaultImg from "@/public/images/profilePic.png";
import { socket } from "@/lib/socket";
import ActionBtn from "./ActionBtn";

type Props = {
    userInfo: {
        img?: string | null;
        id?: string | null;
        name?: string | null;
        email?: string | null;
        gamesPlayed?: number | null;
        gamesWon?: number | null;
    }
}

export default function ProfileClient({ userInfo }: Props) {
    const router = useRouter();

    const profileInfo = [
        { label: "Name", value: userInfo.name },
        { label: "id", value: userInfo.id },
        { label: "Email", value: userInfo.email },
        { label: "Games played", value: userInfo.gamesPlayed },
        { label: "Won", value: userInfo.gamesWon },
    ]

    useEffect(() => {
        const handleReconnect = ({ roomId }: { roomId: string }) => {
            console.log("Reconnected to room: ", roomId);
            router.push(`/play/${roomId}`)
        }
        socket.on("reconnected", handleReconnect);

        return () => {
            socket.off("reconnected", handleReconnect);
        }

    }, [router]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <Card className="flex items-center max-w-150 backdrop-blur-md bg-white/10">
                <div className="flex flex-col items-center gap-4 sm:text-2xl px-3">
                    <Image
                        className="rounded-full"
                        loading="eager"
                        src={userInfo.img || defaultImg}
                        alt="profile Image"
                        height={100}
                        width={100}
                    />
                    <div className="rounded-md py-3 px-10 flex flex-col justify-center text-md gap-2 backdrop-blur-md bg-black/60">
                        {profileInfo.map((item) => (
                            <div key={item.label} className="flex gap-3">
                                <h1>{item.label}:</h1>
                                <h1>{item.value}</h1>
                            </div>
                        ))}

                    </div>
                </div>
                <ActionBtn type="logout" />
            </Card>

            <ActionBtn type="play" />
        </div>
    )
};