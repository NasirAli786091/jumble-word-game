import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home/profile");
  }

  return (
    <main
      style={{
        background: "var(--backgroundBG)"
      }}
      className="grid-texture flex min-h-screen flex-col items-center justify-center gap-6">
      <ScoreWordClips />
      <h1 className="text-3xl text-fuchsia-600">Welcome to Score Word</h1>
      <p>Learn english as you play</p>
      <div className="flex gap-4">
        <div>
          <Button asChild>
            <Link href="/api/signup">Register</Link>
          </Button>
        </div>

        <Button asChild>
          <Link href="/api/signin">Login</Link>
        </Button>
      </div>
    </main>
  );
}

export function ScoreWordClips() {

  const styleLetters = "w-14 h-14 flex items-center justify-center rounded-lg text-5xl bg-[linear-gradient(160deg,#fbf4e6,#f3ead9_60%,#ead9b8)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_6px_0_#dfd2b6,0_10px_16px_rgba(10,0,20,0.45)]";

  return (
    <div className="flex gap-2.5 text-mist-700">
      <div className={`${styleLetters} -rotate-3`}>S</div>
      <div className={`${styleLetters} rotate-2`}>C</div>
      <div className={`${styleLetters} -rotate-1 -translate-y-1`}>O</div>
      <div className={`${styleLetters} rotate-2`}>R</div>
      <div className={`${styleLetters} -rotate-2`}>E</div>
    </div>
  )
}