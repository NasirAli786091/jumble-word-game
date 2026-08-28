import { getServerSession } from "next-auth";
import GameClient from "./components/GameClient";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{
        roomId: string;
    }>
}

export default async function GamePage({ params }: Props) {
    const { roomId } = await params;
    const session = getServerSession();

    if (!session) {
        redirect("/");
    }

    return (
        <div
            style={{
                background: "var(--backgroundBG)"
            }}
            className="grid-texture min-h-screen flex flex-col p-3 sm:p-10"
        >
            <GameClient roomId={roomId} />
        </div>
    );
}