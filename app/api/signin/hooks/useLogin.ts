import { loginSchema } from "@/lib/authSchemas/signIn/sign-in";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";

export function useLogin() {
    const router = useRouter();

    const [serverMsg, setServerMsg] = useState({
        msg: "",
        success: false,
    })

    const loginUser = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response = await signIn("credentials", {
              email: data.email,
              password: data.password,
              redirect: false,
            });
        
            if (response?.error) {
              setServerMsg({
                success: false,
                msg: "Invalid email or password",
              });
              return;
            }
        
            setServerMsg({
              success: true,
              msg: "Account verified",
            });
        
            router.push("/home/profile");
          } catch (error) {
            setServerMsg({
              success: false,
              msg: "Something went wrong. Try again.",
            });
        
            console.error(error);
          }
    }

    return {
        serverMsg,
        loginUser
    }
}