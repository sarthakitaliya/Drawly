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
    if (documentId && documentId !== "dashboard") {
      setDocumentID(documentId as string);
    }
    return () => {
      setDocumentID("");
    };
  }, [documentId]);

  // useEffect(() => {
  //   if (documentId && documentId !== "dashboard") {
  //     checkDocumentAccess(documentId as string).then((res: any) => {
  //       console.log(res);

  //       if (!res?.status) {
  //         setDocumentID("");
  //         setError("You don't have access to this document");
  //         redirect("/dashboard");
  //       }

  //       console.log("isCollaborative", res?.isCollab);  
        
  //       if (res?.isCollab) {
  //         setIsCollaborative(true);
  //         if (socket) {
  //           return;
  //         }else{
  //           connectToSocket(process.env.NEXT_PUBLIC_SOCKET_URL as string, documentId as string);
  //         }
  //       }
  //     });
  //   }
  // }, [documentId]);
  
  return <>{children}</>;
}
