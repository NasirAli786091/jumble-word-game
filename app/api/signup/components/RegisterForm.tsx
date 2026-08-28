"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import Footer from "./Footer";
import AuthField from "./AuthField";
import SubmitBtn from "@/components/SubmitBtn";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/lib/authSchemas/signUp/sign-up";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
    const { serverMsg, registerUser } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    })
    return (
        <Card className="sm:w-xl text-center w-full rounded-4xl backdrop-blur-md bg-black/30">
            <CardHeader>
                <CardTitle className="text-3xl">Sign Up</CardTitle>
                <CardDescription className="text-zinc-400">
                    Hello There, Welcome!
                </CardDescription>
                {serverMsg.msg && (
                    <p className={serverMsg.success ? "text-emerald-700" : "text-red-700"}>
                        {serverMsg.msg}
                    </p>
                )}
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(registerUser)}
                    className="space-y-5"
                >
                    <AuthField
                        id="username"
                        label="Username"
                        placeholder="JohnDoeHere"
                        error={errors?.username?.message}
                        registration={register("username")}
                    />
                    <AuthField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        error={errors?.email?.message}
                        registration={register("email")}
                    />
                    <AuthField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="******"
                        error={errors?.password?.message}
                        registration={register("password")}
                    />
                    <AuthField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="******"
                        error={errors?.confirmPassword?.message}
                        registration={register("confirmPassword")}
                    />
                    
                    <SubmitBtn
                        disabled={isSubmitting}
                    />
                    <div className="flex flex-1 items-center justify-center gap-1">
                        <p>Have account?</p>
                        <Link href="/api/signin">
                            <span className="underline cursor-pointer hover:text-zinc-500">Sign In</span>
                        </Link>
                    </div>

                </form>
            </CardContent>
            <Footer />
        </Card>
    )
}