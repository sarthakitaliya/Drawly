"use client";

import { useCanvasStore } from "@repo/store";
import {  useParams } from "next/navigation";
import { useEffect } from "react";

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setDocumentID } =
    useCanvasStore();
  const { documentId } = useParams();
  useEffect(() => {
      setDocumentID(documentId as string);
    return () => {
      setDocumentID("");
    };
  }, []);
    
  return <>{children}</>;
}
