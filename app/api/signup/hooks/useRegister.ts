import { handleSignUp } from "@/app/(auth)/(backend)/_authActions/handleSignUp";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRegister() {
    const router = useRouter();

    const [serverMsg, setServerMsg] = useState({
        msg: "",
        success: false
    })

    const registerUser = async (data: any) => {
        const response = await handleSignUp(data);

        if(!response.success) {
            setServerMsg({
                msg: response.message,
                success: false,
            })
            return;
        }

        const login = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if(login?.ok) {
            router.push("/home/profile")
        }else{
            setServerMsg({
                msg: login?.error || "Login failed",
                success: false,
            })
        }
    }

    return {
        serverMsg,
        registerUser
    }
}