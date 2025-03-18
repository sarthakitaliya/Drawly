"use client";

import { useCanvasStore, useLoadingStore } from "@repo/store";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { checkDocumentAccess } from "../../../../utils/checkDocumentAccess";

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setDocumentID, documentID } = useCanvasStore();
  const { setError } = useLoadingStore();
  const {documentId } = useParams();
    useEffect(() => {
      if (documentId && documentId !== "dashboard") {
        setDocumentID(documentId as string);
      }
      return () => {
        setDocumentID("");
      };
    }, []);
      useEffect(() => {
        if(documentId && documentId !== "dashboard") {
          const res = checkDocumentAccess(documentID as string);
          if (!res) {
            setDocumentID("");
            setError("You don't have access to this document");
            redirect("/dashboard");
          }
        }
      }, [documentId])
  return <>{children}</>;
}
