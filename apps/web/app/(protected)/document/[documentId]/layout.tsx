"use client";

import { useCanvasStore, useLoadingStore, useSocketStore } from "@repo/store";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { checkDocumentAccess } from "../../../../utils/SessionStorage";


export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setDocumentID } = useCanvasStore();
  const { setError } = useLoadingStore();
  const {documentId } = useParams();
  const {connectToSocket} = useSocketStore();
    useEffect(() => {
      if (documentId && documentId !== "dashboard") {
        setDocumentID(documentId as string);
      }
      return () => {
        setDocumentID("");
      };
    }, [documentId]);
      useEffect(() => {
        if(documentId && documentId !== "dashboard") {
          checkDocumentAccess(documentId as string).then((res) => {
            const cachedDocuments = JSON.parse(
              sessionStorage.getItem("documentIds") || "[]"
            );
            const findId = cachedDocuments.find((doc: any) => doc.id === documentId);
            if(findId.isCollaborative){
              connectToSocket(process.env.NEXT_PUBLIC_SOCKET_URL as string);
            }            
            if (!res) {
              setDocumentID("");
              setError("You don't have access to this document");
              redirect("/dashboard");
            }
          });
        }
      }, [documentId])
  return <>{children}</>;
}
