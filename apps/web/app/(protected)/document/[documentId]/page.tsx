"use client";
import { useEffect, useRef, useState } from "react";
import Tools, { Tool } from "../../../../components/Tools";
import { Draw } from "../../../../utils/draw";
import { useCanvasStore, useLoadingStore, useSocketStore } from "@repo/store";
import { checkDocumentAccess } from "../../../../utils/localStorage";
import { redirect } from "next/navigation";
import OtherCursors from "../../../../components/otherCursors";

export default function CanvasPage() {
  const { addShape, getShapes, documentID, setDocumentID, getAllMembers, setIsCollaborative } =
    useCanvasStore();
  const { connectToSocket, isConnected, disconnect } = useSocketStore();
  const { setError } = useLoadingStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("rect");
  const [canva, setCanva] = useState<Draw>();
  const [members, setMembers] = useState<any[]>([]);
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
        setIsCollaborative(true); 
        console.log("Socket connection initialized");
        const member = await getAllMembers(documentID as string)
        setMembers(member);
      } catch (error) {
        setDocumentID("");
        console.error("Failed to connect to socket:", error);
        setError("Failed to connect to collaborative session");
      }
    }else{
      setIsCollaborative(false);
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
        documentID,
        false,
        //@ts-ignore
        getShapes,
        addShape,
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
      <OtherCursors />
      <Tools selectedTool={tool} setSelectedTool={setTool} canva={canva} members={members} isReadonly={false} />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
