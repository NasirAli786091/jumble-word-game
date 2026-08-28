import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./components/RegisterForm";

export default async function RegisterPage(){
    const session = await getServerSession(authOptions);

    if(session){
        redirect("/home/profile");
    }

    return (
        <div
        style={{
            background: "var(--backgroundBG)"
        }}
        className="grid-texture min-h-screen flex flex-col items-center justify-center px-5 backdrop-blur-md bg-white/10">
            <RegisterForm/>
        </div>
    )
}