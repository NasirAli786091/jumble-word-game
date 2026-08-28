"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/authSchemas/signIn/sign-in";
import * as z from "zod";
import Link from "next/link";

import { useLogin } from "../hooks/useLogin";
import AuthField from "./AuthField";
import { Footer } from "./Footer";
import SubmitBtn from "@/components/SubmitBtn";

export default function LoginForm() {
    const { loginUser, serverMsg } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    })
    return (

        <Card className="sm:w-xl text-center w-full rounded-4xl backdrop-blur-md bg-black/20">
            <CardHeader>
                <CardTitle className="text-3xl">Sign In</CardTitle>
                <CardDescription className="text-zinc-400">
                    Welcome Back!
                </CardDescription>
                {serverMsg.msg && (
                    <p
                        className={
                            serverMsg.success ?
                                "text-emerald-700" : "text-red-700"
                        }
                    >
                        {serverMsg.msg}
                    </p>
                )}
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(loginUser)}
                    className="space-y-5"
                >
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

                    <SubmitBtn
                        disabled={isSubmitting}
                    />
                    <div className="flex flex-1 items-center justify-center gap-1">
                        <h1>Not signed up?</h1>
                        <Link href="/api/signup">
                            <span className="underline cursor-pointer hover:text-zinc-500">Sign Up</span>
                        </Link>
                    </div>
                </form>
            </CardContent>

            <Footer />

        </Card>
    )
}