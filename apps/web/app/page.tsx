import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOption } from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function Home() {
  const session = await getServerSession(authOption);

  if(session?.user){
    redirect("/dashboard")
  }

  return (
    <div className="bg-red">
      <h1 className="text-2xl bg-amber-200">Here will be the landing page</h1>
      <Link href="/api/auth/signin">
      <button>Signin</button>
      </Link>
    </div>
  );
}
