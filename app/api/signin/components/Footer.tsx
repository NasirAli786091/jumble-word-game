import OAuthButton from "@/components/OAuthButton";
import { CardFooter } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export function Footer() {
    return (
        <CardFooter className="flex flex-1 border-none justify-center items-center space-x-10 backdrop-blur-md bg-black/0">
            <OAuthButton
                provider="github"
                icon={FaGithub}
                label="Github"
            />
            <OAuthButton
                provider="google"
                icon={IoMdMail}
                label="Google"
            />
        </CardFooter>
    )
}