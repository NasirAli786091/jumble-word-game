"use client";

import { useOpponentDisconnect } from "../hooks/useOpponentDisconnect";
import GamePageBody from "./GamePageBody";
import OpponentLeftModal from "./OpponentLeftModal";

interface Props {
    roomId: string;
}

export default function GameClient({ roomId }: Props) {
    const {
        opponentGone,
        countdown,
        leaveMatch,
    } = useOpponentDisconnect(roomId);

    return (
        <>
            {/* Opponent Left Modal */}
            {opponentGone && (
                <OpponentLeftModal countdown={countdown} />
            )}

            {/* Game UI */}
            <GamePageBody leaveMatch={leaveMatch} />
        </>
    )
}