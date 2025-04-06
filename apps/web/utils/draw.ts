import { Tool } from "../components/Toolbar";
import { checkDocumentAccess } from "./localStorage";
import { useSocketStore, useLoadingStore } from "@repo/store";

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
  private getShapes: (documentId: string) => Promise<Shape[]>;
  private socket: any = null;
  private isCollaborative: boolean = false;
  private socketStore: any;
  constructor(
    canvas: HTMLCanvasElement,
    setShapes: (shapes: Shape) => void,
    addShape: (shape: Shape, documentID: string) => void,
    documentID: string,
    getShapes: (documentId: string) => Promise<Shape[]>,
    socketStore: any | null
  ) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d")!;
    this.clicked = false;
    this.socketStore = socketStore;
    this.getShapes = getShapes;
    this.existingShapes = [];
    this.setShapes = setShapes;
    this.documentID = documentID;
    this.addShape = addShape;
    this.socket = socketStore?.socket || null;
    this.isCollaborative = !!socketStore?.isConnected;
    this.init();
    this.initMouseHandlers();
  }

  async init() {
    if (!this.documentID) return;

    try {
      // Load existing shapes
      const shapes = await this.getShapes(this.documentID);
      this.existingShapes = Array.isArray(shapes) ? shapes : [];

      // Initialize socket events only for collaborative mode
      if (this.isCollaborative && this.socket) {
        this.initSocketEvents();
      }

      this.clearCanvas();
    } catch (error) {
      console.error('Failed to initialize canvas:', error);
      useLoadingStore.getState().setError('Failed to load shapes');
    }
  }

  initSocketEvents() {
    if (!this.isCollaborative || !this.socket) {
      return;
    }

    this.socket.on("draw", (data: any) => {
      if (!data) return;
      console.log(data);
      this.existingShapes.push(data);
      this.clearCanvas();
      console.log(this.existingShapes);
    });
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

      this.ctx.moveTo(centerX, shape.y); 
      this.ctx.lineTo(shape.x + shape.width, centerY); 
      this.ctx.lineTo(centerX, shape.y + shape.height); 
      this.ctx.lineTo(shape.x, centerY); 
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

    if (!this.existingShapes) return;
    console.log("from the draw", this.existingShapes);

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
    if (!this.clicked) return;
    
    this.clicked = false;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = x - this.startX;
    const height = y - this.startY;

    let shape: Shape | null = null;

    switch (this.selectedTool) {
      case "rect":
        shape = {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
        };
        break;
      case "circle":
        const centerX = (this.startX + x) / 2;
        const centerY = (this.startY + y) / 2;
        shape = {
          type: "circle",
          centerX,
          centerY,
          radiusX: Math.abs(width / 2),
          radiusY: Math.abs(height / 2),
        };
        break;
      case "rhombus":
        shape = {
          type: "rhombus",
          x: this.startX,
          y: this.startY,
          width,
          height,
        };
        break;
    }

    if (!shape) return;

    // Add shape to local state
    this.existingShapes.push(shape);
    this.clearCanvas();

    // Handle collaborative vs non-collaborative mode
    if (this.isCollaborative) {
      if (!this.socket?.connected) {
        useLoadingStore.getState().setMsg("Please refresh the page");
        return;
      }
      this.socket.emit("draw", { shape, roomId: this.documentID });
    } else {
      // For non-collaborative mode, just save to backend
      this.addShape(shape, this.documentID);
    }
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
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
