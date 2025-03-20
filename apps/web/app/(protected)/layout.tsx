"use client";

import { useUserStore } from "@repo/store";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import ErrorHandler from "../../components/ErrorHandle";
import { setSessionStorage } from "../../utils/SessionStorage";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser } = useUserStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if(session?.user && status == "authenticated") {
      setSessionStorage();  
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
    } else if (status == "unauthenticated") {
      redirect("/api/auth/signin");
    }
  }, [session, setUser]);
  if (status == "loading") return <h1>Loading...</h1>;

  if (!session?.user) redirect("/api/auth/signin");
  return (
    <>
      <Toaster />
      <ErrorHandler />
      {children}
    </>
  );
}
