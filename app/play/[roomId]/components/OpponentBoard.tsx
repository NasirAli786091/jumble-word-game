import { WordData } from "../hooks/useGame";

type OpponentBoardProps = {
    opponentScore: number;
    word: WordData | null;
}
const styleLettersButton = `
w-12 h-12 text-xl 
sm:w-13 sm:h-13 sm:text-2xl
md:w-10 md:h-10 md:text-4xl
lg:w-20 lg:h-20 lg:text-5xl
border rounded-full
flex items-center justify-center
`
export default function OpponentBoard({opponentScore, word}: OpponentBoardProps) {
    return (
        <div className="flex flex-col items-center">
            <div className="h-20 w-full flex items-center p-4">
                <h1>Score: {opponentScore}</h1>
            </div>
            <div className="w-full flex-1 flex items-center justify-center gap-4 text-black text-center">
                {
                    [...word?.scrambleWord || ""].map((_, index) => (
                        <div
                            key={index}
                            className={`${styleLettersButton}}`}
                        >
                            x
                        </div>
                    ))
                }
            </div>
        </div>
    )
}