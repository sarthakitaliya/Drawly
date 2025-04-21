"use client";
import { useCanvasStore, useLoadingStore } from "@repo/store";
import { redirect, useParams } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { Draw } from "../../../utils/draw";
import Tools from "../../../components/Tools";

export default function ReadonlyPage() {
  const { documentID, setDocumentID, getShapes, checkAccessForShare } = useCanvasStore();
const { setError } = useLoadingStore();
  const { documentId } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canva, setCanva] = useState<Draw>();

  useEffect(() => {
    setDocumentID(documentId as string);
    return () => {
      setDocumentID("");
    };
  }, [documentId, setDocumentID]);
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await checkAccessForShare(documentId as string);
        console.log(response);
        
      } catch (error) {
        console.error("Error checking access:", error);
        setError("You don't have access to this document");
        redirect("/");
      }
    };
    checkAccess();
  }
  , [documentID]);

  useEffect(() => {
    if (!canvasRef.current || !documentID) return;
    const g = new Draw(
      canvasRef.current,
      documentID,
      true,
      //@ts-ignore
      getShapes
    );
    setCanva(g);
    if (!g) return;
    g.setTool("hand");
  }, [canvasRef, documentID]);
  return (
    <div>
      <Tools
        selectedTool={"hand"}
        setSelectedTool={() => {}}
        canva={canva}
        members={[]}
        setMembers={() => {}}
        isReadonly={true}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
