"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ActionBtnProps {
    type: "logout" | "play";
}

export default function ActionBtn({ type }: ActionBtnProps) {
    const router = useRouter();

    const handleClick = () => {
        if (type === "logout") {
            signOut({
                callbackUrl: "/",
            })
        }
        if (type === "play") {
            router.push("/play/find-match");
        }
    }

    return (
        <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{duration: 0.3, ease: "easeInOut"}}
        >
            <Button
                className="cursor-pointer w-15 bg-parent border-black text-white font-semibold"
                onClick={handleClick}
            >
                {type === "play" ? "play" : "logout"}
            </Button>
        </motion.div>
    )
}