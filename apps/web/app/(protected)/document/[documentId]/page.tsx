"use client";
import { useEffect, useRef, useState } from "react";
import ToolBar, { Tool } from "../../../../components/Toolbar";
import { Draw } from "../../../../utils/draw";
import { useCanvasStore, useLoadingStore, useSocketStore } from "@repo/store";
import { checkDocumentAccess } from "../../../../utils/localStorage";
import { redirect } from "next/navigation";

export default function CanvasPage() {
  const { setShapes, addShape, getShapes, documentID, setDocumentID } =
    useCanvasStore();
  const { connectToSocket, isConnected, disconnect } = useSocketStore();
  const { setError } = useLoadingStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("rect");
  const [canva, setCanva] = useState<Draw>();
  const socketStore = useSocketStore.getState();


  async function connect() {
    if (!documentID) {
      console.log("documentID is not set");
      return;
    }
    const response = await checkDocumentAccess(documentID as string);
    if (!response?.status) {
      setError("You don't have access to this document");
      redirect("/dashboard");
      return;
    }
    if (response?.isCollab && !isConnected) {
      try {
        
        const socket = await connectToSocket(
          process.env.NEXT_PUBLIC_SOCKET_URL as string,
          documentID as string
        );
        console.log("Socket connection initialized");
      } catch (error) {
        setDocumentID("");
        console.error("Failed to connect to socket:", error);
        setError("Failed to connect to collaborative session");
      }
    }
  }
  useEffect(() => {
    connect();

    return () => {
 
      if (isConnected) {
        disconnect();
      }
    };
  }, [documentID]);
  useEffect(() => {
    if (canvasRef.current) {
      if (!documentID) {
        return;
      }
      console.log("rendering");

      const g = new Draw(
        canvasRef.current,
        //@ts-ignore
        setShapes,
        addShape,
        documentID,
        getShapes,
        socketStore
      );
      setCanva(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, isConnected, documentID]);
  useEffect(() => {
    canva?.setTool(tool);
  }, [tool, canva]);
  return (
    <div>
      <ToolBar selectedTool={tool} setSelectedTool={setTool} canva={canva} />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
