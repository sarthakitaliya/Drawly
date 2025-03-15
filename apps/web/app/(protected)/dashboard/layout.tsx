"use client";
import { useUserStore } from "@repo/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  
  return (
    <>
      {children}
    </>
  );
}
