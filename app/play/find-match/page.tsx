import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import FindMatchPage from "./components/FindMatchPage";

export default async function FindPage() {
    const session = await getServerSession(authOptions);
    
    if(!session){
        redirect("/api/signin");
    }

    return <FindMatchPage/>
}