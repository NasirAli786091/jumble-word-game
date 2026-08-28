"use client"

import { AnimatePresence, motion, Transition, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimatedSwapProps = {
    /** Unique value that identifies the current content — changing this triggers exit/enter animation */
    swapKey: string | number;
    children: ReactNode;
    /** Preset animation style, or pass custom variants for full control */
    variant?: "fade-up" | "fade-down" | "scale" | "fade";
    customVariants?: Variants;
    transition?: Transition;
    /** "wait" = old fully exits before new enters, "sync" = they cross-fade together */
    mode?: "wait" | "sync";
    className?: string;
};

const presets: Record<NonNullable<AnimatedSwapProps["variant"]>, Variants> = {
    "fade-up": {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
    },
    "fade-down": {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
    },
    scale: {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.85 },
    },
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
};

export default function AnimatedSwap({
    swapKey,
    children,
    variant = "fade-up",
    customVariants,
    transition = { duration: 0.3, ease: "easeOut" },
    mode = "wait",
    className,
}: AnimatedSwapProps) {
    const variants = customVariants ?? presets[variant];

    return (
        <AnimatePresence mode={mode}>
            <motion.div
                key={swapKey}
                className={className}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}