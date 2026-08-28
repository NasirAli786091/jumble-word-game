import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BtnComProps {
    children: ReactNode;
    classname?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
}
export default function BtnCom({
    children,
    classname,
    onClick,
    disabled = false,
    type = "button"
}: BtnComProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
            }}
            whileTap={{scale: 0.95}}
        >
            <Button
                className={`hover:cursor-pointer text-white font-extrabold ${classname ?? ""} backdrop-blur-lg bg-parent border-black`}
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </Button>
        </motion.div>
    )
}