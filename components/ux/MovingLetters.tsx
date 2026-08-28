import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, Transition } from "framer-motion";

const divSize = 40;
const gap = 16;
const slot = divSize + gap;

const springAnimation: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 12,
};

type Box = { id: number; letter: string };

const initialLetters = ["M", "I", "X", "E", "D"];

export function MovingLetters() {
  const [boxes, setBoxes] = useState<Box[]>(
    initialLetters.map((letter, id) => ({ id, letter }))
  );

  const boxesRef = useRef(boxes);
  useEffect(() => {
    boxesRef.current = boxes;
  }, [boxes]);

  // Fixed number of hook calls, same order every render — rules-of-hooks safe.
  // Bound directly to motion.div below, so no separate mount/ref indirection.
  const c0 = useAnimation();
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const c4 = useAnimation();
  const controlsById = [c0, c1, c2, c3, c4]; // index = box.id, stable for life of component

  const chooseRandom = () => {
    let a = Math.floor(Math.random() * boxesRef.current.length);
    let b = Math.floor(Math.random() * boxesRef.current.length);

    while (a === b) {
      b = Math.floor(Math.random() * boxesRef.current.length);
    }

    if (a > b) [a, b] = [b, a];
    return [a, b];
  };

  const run = async (a: number, b: number) => {
    const current = boxesRef.current;
    const distance = (b - a) * slot;

    const aController = controlsById[current[a].id];
    const bController = controlsById[current[b].id];

    await Promise.all([
      aController.start({ y: -divSize, scale: 1.2, transition: springAnimation }),
      bController.start({ y: divSize, scale: 1.2, transition: springAnimation }),
    ]);

    await Promise.all([
      aController.start({ x: distance, transition: springAnimation }),
      bController.start({ x: -distance, transition: springAnimation }),
    ]);

    await Promise.all([
      aController.start({ y: 0, scale: 1, transition: springAnimation }),
      bController.start({ y: 0, scale: 1, transition: springAnimation }),
    ]);

    aController.set({ x: 0 });
    bController.set({ x: 0 });

    setBoxes((prev) => {
      const copy = [...prev];
      [copy[a], copy[b]] = [copy[b], copy[a]];
      return copy;
    });
  };

  useEffect(() => {
    let active = true;

    const startLoop = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      while (active) {
        const [a, b] = chooseRandom();
        await run(a, b);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    startLoop();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative flex gap-4 text-4xl font-bold cursor-default">
      {boxes.map((box) => (
        <motion.div
          key={box.id}
          className="w-10 h-10 flex items-center justify-center text-white backdrop-blur-md border border-white/45 rounded-sm"
          animate={controlsById[box.id]}
        >
          <p className="text-sm">{box.letter}</p>
        </motion.div>
      ))}
    </div>
  );
}