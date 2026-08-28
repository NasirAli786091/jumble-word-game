import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom"
import { DragDropProvider } from "@dnd-kit/react"
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WordData } from "../hooks/useGame";
import AnimatedSwap from "../animate/AnimatedSwap";

const styleLettersButton = `
w-12 h-12 text-xl 
sm:w-13 sm:h-13 sm:text-2xl
md:w-10 md:h-10 md:text-4xl
lg:w-20 lg:h-20 lg:text-5xl
border rounded-full
bg-[linear-gradient(160deg,#fbf4e6,#f3ead9_60%,#ead9b8)]
flex items-center justify-center
cursor-grab
transition-colors duration-300 ease-in-out
hover:brightness-95
`

const rightAns = `bg-emerald-500 border-emerald-600 bg-none animate-pulse transition-bg duration-500 ease-in-out`;
const wrongAns = `bg-red-500 border-red-600 bg-none animate-pulse transition-bg duration-500 ease-in-out`;

type Letters = {
    id: string;
    val: string;
};

type LettersComProp = {
    word: WordData | null;
    letters: Letters[];
    setLetters: Dispatch<SetStateAction<Letters[]>>;
    wrongAnsStyle: boolean;
}

type SortableProps = {
    id: string;
    val: string;
    index: number;
    wrongAnsStyle: boolean;
}

export function Sortable({ id, val, index, wrongAnsStyle }: SortableProps) {
    const { ref, isDragging } = useSortable({ id, index });
    return (
        <li
            className={`
            touch-none
            ${styleLettersButton}
            ${isDragging ? "brightness-95 scale-120 shadow-lg" : ""}
            ${wrongAnsStyle ? wrongAns : ""}
            `}
            ref={ref}
        >
            {val}
        </li>
    );
}

export default function LettersCom({ word, letters, setLetters, wrongAnsStyle }: LettersComProp) {
    useEffect(() => {
        if (!word) {
            setLetters([]);
            return;
        }

        setLetters(
            [...word.scrambleWord].map((val) => ({
                id: crypto.randomUUID(),
                val: val.toUpperCase(),
            }))
        );
    }, [word]);
    return (
        <div className="w-full flex items-center justify-center text-black overflow-hidden">
            <DragDropProvider
            sensors={(defaults) => [
                ...defaults.filter((sensor) => sensor !== PointerSensor),
                PointerSensor.configure({
                    activationConstraints(event, source){
                        if(event.pointerType === "touch"){
                            return [
                                new PointerActivationConstraints.Delay({
                                    value: 200,
                                    tolerance: {x: 5, y: 5},
                                }),
                            ];
                        }
                        return [new PointerActivationConstraints.Distance({ value: 8})]
                    }
                })
            ]}
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const { source } = event.operation;
                    if (!isSortable(source)) return;

                    const { initialIndex, index } = source;
                    if (initialIndex === index) return;

                    setLetters((prev) => {
                        const copy = [...prev];
                        const [moved] = copy.splice(initialIndex, 1);
                        copy.splice(index, 0, moved);
                        return copy;
                    })

                }}
            >
                {<AnimatedSwap swapKey={word?.scrambleWord ?? "empty"} variant="fade-up" mode="wait">
                    <ul className="flex gap-2.5">

                        {letters.map((letter, index) =>
                            <Sortable
                                key={letter.id}
                                id={letter.id}
                                index={index}
                                val={letter.val}
                                wrongAnsStyle={wrongAnsStyle}
                            />
                        )}
                    </ul>
                </AnimatedSwap>}
            </DragDropProvider>
        </div>
    )
}