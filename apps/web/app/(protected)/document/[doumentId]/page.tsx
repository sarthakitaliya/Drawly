"use client";
import { use, useEffect, useRef, useState } from "react";
import ToolBar, { Tool } from "../../../../components/Toolbar";
import { Draw } from "../../../../utils/draw";
import { redirect, useParams } from "next/navigation";
import { useCanvasStore, useLoadingStore } from "@repo/store";
import { checkDocumentAccess } from "../../../../utils/checkDocumentAccess";

export default function CanvasPage() {
  const url = new URL(window.location.href);
  const documentId = url.pathname.split("/").pop();
  
  const params = useParams();
  const { setDocumentID, shapes, setShapes, addShape, getShapes, documentID } =
  useCanvasStore();
  const {setError} = useLoadingStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("rect");
  const [canva, setCanva] = useState<Draw>();

  useEffect(() => {
    if (documentId && documentId !== "dashboard") {
      setDocumentID(documentId);
    }
    return () => {
      setDocumentID("");
    };
  }, [documentID]);
  useEffect(() => {
    if(documentID && documentID !== "dashboard") {
      const res = checkDocumentAccess(documentID as string);
      console.log("Document Access", res);
      if (!res) {
        setDocumentID("");
        setError("You don't have access to this document");
        redirect("/dashboard");
      }
    }
  }, [documentID])
  useEffect(() => {
    if (documentId) {
      getShapes(documentId as string);
    }
  }, [documentId]);
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Draw(
        canvasRef.current,
        shapes,
        setShapes,
        addShape,
        documentId
      );
      setCanva(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, documentId]);
  useEffect(() => {
    canva?.setTool(tool);
  }, [tool, canva]);
  return (
    <div>
      <ToolBar selectedTool={tool} setSelectedTool={setTool} />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
