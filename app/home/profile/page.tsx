import ProfileClient from "./components/ProfileClient";

import { authOptions } from "@/auth";
import { getUserById } from "@/lib/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/");
    }

    const userId = session.user.id;

    const user = await getUserById(userId);

    if(!user){
        redirect("/");
    }

    const userInfo = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        img: user?.image,
        gamesPlayed: user?.gamesPlayed,
        gamesWon: user?.gamesWon,
    }

    return (
        <div
        style={{
            background: "var(--backgroundBG)"
        }} 
        className="grid-texture min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl mt-2">Profile</h1>
            <ProfileClient userInfo={userInfo}/>
        </div>
    )
};