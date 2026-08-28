type Props = {
    countdown: number;
}
export default function OpponentLeftModal({...props} : Props) {

    return (
        <div
        className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-420px rounded-2xl bg-zinc-900 border border-zinc-700 p-8 text-center shadow-2xl">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-4xl">⚠️</span>
                </div>

                <h2 className="text-3xl font-bold text-white">
                    Opponent Left
                </h2>

                <p className="mt-3 text-zinc-400">
                    Your opponent disconnected or left the match.
                </p>

                <div className="mt-6 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                    <p className="text-green-400 font-semibold">
                        Victory by Forfeit
                    </p>
                </div>

                <p className="mt-6 text-sm text-zinc-500">
                    Returning to profile in {props.countdown}s...
                </p>
            </div>
        </div>
    )
}