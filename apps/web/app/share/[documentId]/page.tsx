"use client";
import { useCanvasStore } from "@repo/store";
import { useParams } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { Draw } from "../../../utils/draw";
import Tools from "../../../components/Tools";

export default function ReadonlyPage() {
  const { documentID, setDocumentID, getShapes } = useCanvasStore();
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
        isReadonly={true}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
