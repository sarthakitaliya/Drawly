"use client";

import { useUserStore } from "@repo/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import api from "../../utils/axios";
import axios from "axios";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {user, setUser} = useUserStore();
  const { data: session, status } = useSession();
  const setToken = async () => {
    const res = await axios.post("/api/auth/set-token", {withCredentials: true});
    console.log(res);
    const check = await api("http://localhost:3001/");
    console.log("ccccc---", check);
  }
  useEffect(() => {
    if (session?.user && status == "authenticated") {
          const user = session.user as {
            id: string;
            name: string;
            email: string;
            image?: string;
          };
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user?.image,
          });
          setToken();

        }else if(status == "unauthenticated"){
            redirect("/api/auth/signin")
        }
        
  }, [session, setUser]);
  if (status == "loading") return <h1>Loading...</h1>;

  if(!session?.user) redirect("/api/auth/signin");
  return (
    <>
      {children}
    </>
  );
}
