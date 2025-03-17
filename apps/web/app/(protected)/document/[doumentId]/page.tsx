"use client";
import { use, useEffect, useRef, useState } from "react";
import ToolBar, { Tool } from "../../../../components/Toolbar";
import { Draw } from "../../../../utils/draw";
import { useParams } from "next/navigation";
import { useCanvasStore } from "@repo/store";
import { api } from "@repo/utils/api";

export default function CanvasPage() {
  const params = useParams();
  const { setDocumentID, documentID, shapes, setShapes, addShape, getShapes } =
    useCanvasStore();
  const url = new URL(window.location.href);
  const documentId = url.pathname.split("/").pop();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("rect");
  const [canva, setCanva] = useState<Draw>();
  
  useEffect(() => {
    if (documentId) {
      setDocumentID(documentId);
    }
    return () => {
      setDocumentID("");
    }
  }, [documentID]);

  useEffect(() => {
    if (documentID) {
      getShapes();
    }
  }, [documentID]);
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Draw(
        canvasRef.current,
        shapes,
        setShapes,
        addShape,
        documentID
      );
      setCanva(g);

      return () => {
        g.destroy();
        setDocumentID("");
      };
    }
  }, [canvasRef, documentID]);
  useEffect(() => {
    const res = checkDocument(documentId as string);
    return () => {
      setDocumentID("");
    };
  }, []);
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



const checkDocument = async (documentId: string) => {
  try {
    const res = await api.post("/documents/authorize", { documentId });
    if(res.data.success) {}
    
    return res;
  } catch (error) {
    console.log(error);
    return
    
  }
}