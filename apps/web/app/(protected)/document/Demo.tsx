"use client";

import { useEffect, useRef, useState } from "react";
import Topbar, { Tool } from "../../components/Toolbar";

export default function CanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tool, setTool] = useState<Tool>("rect");
  const [existingShape, setExistingShape] = useState<shape[]>([]);
  type shape =
    | {
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
      }
    | {
        type: "circle";
        centerX: number;
        centerY: number;
        radiusX: number;
        radiusY: number;
      };
  // let existingShape: shape [] = [];

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //     const ctx = canvas?.getContext("2d");
  //     if (!ctx) return;
  //     clearCanvas(canvas, ctx);

  //     //   for changing bg of canvas
  //     //   ctx.fillStyle = "rgb(0, 0, 0)";
  //     //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   }
  // }, []);
  let startX = 0;
  let startY = 0;
  let clicked = false;
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearCanvas(canvas, ctx);
    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      let shape: shape | null = null;
      if (tool === "rect") {
        shape = {
          type: "rect",
          x: startX,
          y: startY,
          width: width,
          height: height,
        };
      } else if (tool === "circle") {
        const centerX = (startX + e.offsetX) / 2;
        const centerY = (startY + e.offsetY) / 2;
        const width = Math.abs(e.offsetX - startX);
        const height = Math.abs(e.offsetY - startY);
        shape = {
          type: "circle",
          centerX: centerX,
          centerY: centerY,
          radiusX: width / 2,
          radiusY: height / 2,
        };
      }
      if(shape == null) return
        //@ts-ignore
        // existingShape.push(shape);
        console.log(existingShape);
        setExistingShape((prev) => [...prev, shape]);
      
      //   ctx?.rect(startX, startY, width, height);
      //   ctx?.stroke();
    });
    canvas.addEventListener("wheel", (e) => {
      console.log(e.deltaY);
    });
    canvas.addEventListener("mousemove", (e) => {
      if (clicked) {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        if (!ctx || !canvas) return;
        clearCanvas(canvas, ctx);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = "rgb(0, 0, 0)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (tool === "rect") {
          ctx.strokeStyle = "rgb(255, 255, 255)";
          ctx?.strokeRect(startX, startY, width, height);
          // console.log("from rect");
        } else if (tool === "circle") {
          //   console.log("YOu are the beast");
          //   const radius = Math.sqrt(
          //     Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2)
          //   );
          const width = Math.abs(e.offsetX - startX);
          const height = Math.abs(e.offsetY - startY);
          const centerX = (startX + e.offsetX) / 2;
          const centerY = (startY + e.offsetY) / 2;

          // const radius = Math.max(height, width) / 2;

          //   const centerX = startX + width / 2;
          //   const centerY = startY + height / 2;
          // //   ctx.beginPath();
          //   ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          //   ctx.strokeStyle = "white";
          //   ctx.lineWidth = 2;
          //   ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            width / 2,
            height / 2,
            0,
            0,
            Math.PI * 2
          );
          // ctx.strokeStyle = "white";
          // ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });
  }, [canvasRef, tool]);
  //   useEffect(() => {
  //     console.log(tool);

  //   }, [tool])

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas?.getContext("2d");
  //     //@ts-ignore
  //      clearCanvas(canvas, ctx)
  //   }, [existingShape.current])
  function clearCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#18181B";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#242424";
    // ctx.lineWidth = 0.5;
    // const gridSize = 40;
    // // Draw vertical lines
    // for (let x = 0; x < canvas.width; x += gridSize) {
    //   ctx.beginPath();
    //   ctx.moveTo(x, 0);
    //   ctx.lineTo(x, canvas.height);
    //   ctx.stroke();
    // }

    // // Draw horizontal lines
    // for (let y = 0; y < canvas.height; y += gridSize) {
    //   ctx.beginPath();
    //   ctx.moveTo(0, y);
    //   ctx.lineTo(canvas.width, y);
    //   ctx.stroke();
    // }
    //@ts-ignore
    existingShape.forEach((shape) => {
      // console.log(shape);
      if (shape.type == "rect") {

        ctx.strokeStyle = "rgb(255, 255, 255)"; 
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type == "circle") {
        ctx.beginPath();
        ctx.ellipse(
          shape.centerX,
          shape.centerY,
          shape.radiusX,
          shape.radiusY,
          0,
          0,
          Math.PI * 2
        );
        // ctx.strokeStyle = "white";
        // ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }
  return (
    <div>
      {/* <Topbar selectedTool={tool} setSelectedTool={setTool} /> */}
      <Topbar selectedTool={tool} setSelectedTool={setTool}/>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
