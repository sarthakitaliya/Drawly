"use client";
import { useEffect, useRef, useState } from "react";
import ToolBar, { Tool } from "../../../../components/Toolbar";
import { Draw } from "../../../../utils/draw";
import { useCanvasStore, useLoadingStore } from "@repo/store";

export default function CanvasPage() {
  const { shapes, setShapes, addShape, getShapes, documentID } =
  useCanvasStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("rect");
  const [canva, setCanva] = useState<Draw>();
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Draw(
        canvasRef.current,
        setShapes,
        addShape,
        documentID,
        getShapes
      );
      setCanva(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, documentID]);
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
