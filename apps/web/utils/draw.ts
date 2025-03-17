import { useCanvasStore } from "@repo/store";
import { Tool } from "../components/Toolbar";

type Shape =
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
    }
  | {
      type: "rhombus";
      x: number;
      y: number;
      width: number;
      height: number;
    };

export class Draw {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: Tool = "circle";
  private setShapes: (shapes: Shape) => void;
  private documentID: string;
  private addShape: (shape: Shape, documentID: string) => void;

  constructor(canvas: HTMLCanvasElement, shapes: Shape[], setShapes: (shapes: Shape) => void, addShape: (shape: Shape) => void, documentID: string) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d")!;
    this.clearCanvas()
    this.clicked = false;
    this.initMouseHandlers();
    //initialize state variables
    this.existingShapes = shapes;
    this.setShapes = setShapes;
    this.documentID = documentID;
    this.addShape = addShape;
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  drawReact(shape: Shape) {
    if (shape?.type == "rect") {
      this.ctx.strokeStyle = "rgb(255, 255, 255)";
      this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  }

  drawRhombus(shape: Shape) {
    if (shape?.type === "rhombus") {
      this.ctx.strokeStyle = "rgb(255, 255, 255)";
      this.ctx.beginPath();

      // Calculate the diamond points based on the shape's width and height
      const centerX = shape.x + shape.width / 2;
      const centerY = shape.y + shape.height / 2;

      this.ctx.moveTo(centerX, shape.y); // Top point
      this.ctx.lineTo(shape.x + shape.width, centerY); // Right point
      this.ctx.lineTo(centerX, shape.y + shape.height); // Bottom point
      this.ctx.lineTo(shape.x, centerY); // Left point
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  drawCircle(shape: Shape) {
    if (shape?.type == "circle") {
      this.ctx.beginPath();
      this.ctx.ellipse(
        shape.centerX,
        shape.centerY,
        shape.radiusX,
        shape.radiusY,
        0,
        0,
        Math.PI * 2
      );
      this.ctx.strokeStyle = "white";
      // ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#18181B";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


    if(!this.existingShapes) return;
    this.existingShapes.forEach((shape) => {
      if (!shape) return;

      switch (shape.type) {
        case "rect":
          this.drawReact(shape);
          break;
        case "circle":
          this.drawCircle(shape);
          break;
        case "rhombus":
          this.drawRhombus(shape);
          break;
      }
    });
  }

  mouseDownHanler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    let shape: Shape | null = null;
    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
      this.setShapes(shape);  
    } else if (this.selectedTool === "circle") {
      const centerX = (this.startX + e.offsetX) / 2;
      const centerY = (this.startY + e.offsetY) / 2;
      const width = Math.abs(e.offsetX - this.startX);
      const height = Math.abs(e.offsetY - this.startY);
      shape = {
        type: "circle",
        centerX: centerX,
        centerY: centerY,
        radiusX: width / 2,
        radiusY: height / 2,
      };
    }

    if (!shape) {
      return;
    }

    this.existingShapes.push(shape);
    this.addShape(shape, this.documentID);
    console.log(this.existingShapes);
    
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;

      this.clearCanvas();

      if (this.selectedTool === "rect") {
        this.drawReact({
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
        });
      } else if (this.selectedTool === "circle") {
        const centerX = (this.startX + e.offsetX) / 2;
        const centerY = (this.startY + e.offsetY) / 2;
        this.drawCircle({
          type: "circle",
          centerX,
          centerY,
          radiusX: Math.abs(width / 2),
          radiusY: Math.abs(height / 2),
        });
      }
    }
  };
  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHanler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHanler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }
}
