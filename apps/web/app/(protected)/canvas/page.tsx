"use client"
import { useEffect, useRef, useState } from "react";
import ToolBar, { Tool } from "../../components/Toolbar";
import { Draw } from "../../utils/draw";


export default function CanvasPage() {
   const canvasRef = useRef<HTMLCanvasElement>(null);``
    
    const [tool, setTool] = useState<Tool>("rect");
    const [canva, setCanva] = useState<Draw>();
    useEffect(() => {
      if(canvasRef.current){
        const g = new Draw(canvasRef.current)
        setCanva(g);
        
        return () => {
          g.destroy()
        }
      }
    }, [canvasRef])
    useEffect(() => {
      canva?.setTool(tool);
    }, [tool, canva])
  return (
      <div>
        <ToolBar selectedTool={tool} setSelectedTool={setTool}/>
        <canvas ref={canvasRef}></canvas>
      </div>
    );
}