import { WordData } from "../hooks/useGame";

const styleFonts = `flex items-center gap-2`;

type WordInfoPros = {
    word: WordData | null;
}

export default function WordInfo({ word }: WordInfoPros) {
    return (
        <div className="p-3 border-b border-gray-500">
            {word && (
                <div className="space-y-2">
                    <div className="flex items-center sm:flex-row sm:items-center gap-2">
                        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                            Part of Speech
                        </span>
                        <span className="rounded-md px-3 font-semibold capitalize text-white bg-indigo-500/40 border border-indigo-500/30">
                            {word.partOfSpeech}
                        </span>
                    </div>

                    <div className="flex items-center sm:flex-row gap-2">
                        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                            Meaning
                        </span>
                        <p className=" text-zinc-200 rounded-md bg-indigo-500/40 border border-indigo-500/30 p-2">
                            {word.defination}
                        </p>
                    </div>

                    <div className="flex sm:flex-row sm:items-center gap-2">
                        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                            Word
                        </span>
                        <span className="rounded-lg bg-indigo-500/40 border border-indigo-500/30 p-2 text-2xl font-extrabold tracking-[0.35em] text-indigo-300">
                            {word.scrambleWord.toUpperCase()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}