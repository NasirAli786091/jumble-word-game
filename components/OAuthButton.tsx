"use client"

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { IconType } from "react-icons/lib";

type OAuthProvider = "github" | "google";

interface OAuthButtonProps{
    provider: OAuthProvider;
    icon: IconType;
    label: string;
    callbackUrl?: string;
}

export default function OAuthButton({
    provider,
    icon: Icon,
    label,
    callbackUrl = "/home/profile",
}: OAuthButtonProps){
    return(
        <Button
            variant="ghost"
            className="w-20 h-20 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
            onClick={() =>
                signIn(provider, {
                    callbackUrl,
                    prompt: "select_account",
                })
            }
        >
            <Icon className="w-8! h-8!"/>
            <span className="text-sm">{label}</span>
        </Button>
    )
}