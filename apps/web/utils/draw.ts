import { Tool } from "../components/Tools";
import { checkDocumentAccess } from "./localStorage";
import { useCanvasStore, useLoadingStore } from "@repo/store";

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
      x: number; //centerX
      y: number; //centerY
      width: number; // radiusX
      height: number; // radiusY
    }
  | {
      type: "rhombus";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "line";
      x: number;
      y: number;
      x2: number;
      y2: number;
    }
  | {
      type: "freehand";
      points: { x: number; y: number }[];
    };

export class Draw {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private freehandPoints: { x: number; y: number }[] = [];
  private selectedTool: Tool = "rect";
  private documentID: string;
  private addShape: (shape: Shape, documentID: string) => void;
  private getShapes: (documentId: string) => Promise<Shape[]>;
  private socket: any = null;
  private isCollaborative: boolean = false;
  private socketStore: any;
  private isPanning: boolean = false;
  private offset: { x: number; y: number } = { x: 0, y: 0 };
  private panStart: { x: number; y: number } = { x: 0, y: 0 };
  private scale: number = 1;
  private isReadonly: boolean = false;
  constructor(
    canvas: HTMLCanvasElement,
    documentID: string,
    isReadonly: boolean = false,
    getShapes: (documentId: string) => Promise<Shape[]>,
    addShape?: (shape: Shape, documentID: string) => void,
    socketStore?: any
  ) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d")!;
    this.clicked = false;
    this.isReadonly = isReadonly;
    this.documentID = documentID;
    this.getShapes = getShapes;

    this.socketStore = socketStore ?? {};
    this.addShape = addShape ?? (() => {});
    this.socket = socketStore?.socket || null;
    this.isCollaborative = !!socketStore?.isConnected;

    this.init();
    this.initMouseHandlers();
  }

  async init() {
    console.log("init", this.documentID);

    if (!this.documentID) return;

    try {
      // Load existing shapes

      const shapes = await this.getShapes(this.documentID, this.isReadonly);
      this.existingShapes = Array.isArray(shapes) ? shapes : [];

      // Initialize socket events only for collaborative mode
      if (this.isCollaborative && this.socket) {
        this.initSocketEvents();
      }

      this.redraw();
    } catch (error) {
      console.error("Failed to initialize canvas:", error);
      useLoadingStore.getState().setError("Failed to load shapes");
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
      this.redraw();
      console.log(this.existingShapes);
    });
    this.socket.on("clear-canvas", (data: { roomId: string }) => {
      console.log("clear canvas come come");
      this.existingShapes = [];
      this.redraw();
    });
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
    this.canvas.style.cursor = tool === "hand" ? "grab" : "crosshair";
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
        shape.x, // centerX
        shape.y, // centerY
        shape.width, // radiusX
        shape.height, // radiusY
        0,
        0,
        Math.PI * 2
      );
      this.ctx.strokeStyle = "white";
      // ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }

  drawLine(shape: Shape) {
    if (shape?.type == "line") {
      this.ctx.beginPath();
      this.ctx.moveTo(shape.x, shape.y);
      this.ctx.lineTo(shape.x2, shape.y2);
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }
  }

  drawFreehand(shape: Shape) {
    console.log(shape);

    if (shape?.type == "freehand") {
      if (!shape.points || shape.points.length < 2) return;

      this.ctx.beginPath();
      const points = shape.points;
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        if (p1 && p2) {
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
        }
      }
      this.ctx.strokeStyle = "white"; // You can set this to dynamic colors
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = "round";
      this.ctx.stroke();
    }
  }
  clearCanvas = async () => {
    console.log(this.documentID);
    try {
      const res = await useCanvasStore.getState().clearCanvas(this.documentID);
      //@ts-ignore
      if (res) {
        this.existingShapes = [];
        this.redraw();
      }
    } catch (error: any) {
      return;
    }
    if (this.isCollaborative) {
      if (!this.socket?.connected) {
        useLoadingStore.getState().setMsg("Please refresh the page");
        return;
      }
      this.socket.emit("clear-canvas", { roomId: this.documentID });
    }
  }
  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#18181B";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.offset.x, this.offset.y);
    this.ctx.scale(this.scale, this.scale);
    // this.ctx.setTransform(1, 0, 0, 1, this.offset.x, this.offset.y); // Reset after drawing

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
        case "line":
          this.drawLine(shape);
          break;
        case "freehand":
          this.drawFreehand(shape);
          break;
      }
    });
    this.ctx.restore();
  }

  mouseDownHanler = (e: MouseEvent) => {
    if (this.selectedTool === "hand") {
      this.isPanning = true;
      this.panStart = { x: e.clientX, y: e.clientY };
      this.canvas.style.cursor = "grabbing";
      return;
    }
    if (this.isReadonly) return;
    if (this.selectedTool === "freehand") {
      this.freehandPoints = [
        {
          x: (e.clientX - this.offset.x) / this.scale,
          y: (e.clientY - this.offset.y) / this.scale,
        },
      ];
    }
    this.clicked = true;
    this.startX = (e.clientX - this.offset.x) / this.scale;
    this.startY = (e.clientY - this.offset.y) / this.scale;
  };

  mouseUpHandler = (e: MouseEvent) => {
    if (this.isPanning) {
      this.isPanning = false;
      this.canvas.style.cursor = "grab";
      return;
    }
    if (!this.clicked) return;

    this.clicked = false;
    const x = (e.clientX - this.offset.x) / this.scale;
    const y = (e.clientY - this.offset.y) / this.scale;
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
          x: centerX,
          y: centerY,
          width: Math.abs(width / 2),
          height: Math.abs(height / 2),
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
      case "line":
        shape = {
          type: "line",
          x: this.startX,
          y: this.startY,
          x2: x,
          y2: y,
        };
        break;
      case "freehand":
        shape = {
          type: "freehand",
          points: this.freehandPoints,
        };
        this.freehandPoints = [];
        break;
    }

    if (!shape) return;

    // Add shape to local state
    this.existingShapes.push(shape);
    this.redraw();

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
    if (this.isPanning) {
      const dx = e.clientX - this.panStart.x;
      const dy = e.clientY - this.panStart.y;
      this.offset.x += dx;
      this.offset.y += dy;
      this.panStart = { x: e.clientX, y: e.clientY };
      this.redraw();
      return;
    }
    if (this.isReadonly) return;
    if (this.clicked) {
      const x = (e.clientX - this.offset.x) / this.scale;
      const y = (e.clientY - this.offset.y) / this.scale;
      const width = x - this.startX;
      const height = y - this.startY;

      this.redraw();
      this.ctx.save();
      this.ctx.translate(this.offset.x, this.offset.y);
      this.ctx.scale(this.scale, this.scale);
      if (this.selectedTool === "rect") {
        this.drawReact({
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
        });
      } else if (this.selectedTool === "circle") {
        const centerX = (this.startX + x) / 2;
        const centerY = (this.startY + y) / 2;
        this.drawCircle({
          type: "circle",
          x: centerX,
          y: centerY,
          width: Math.abs(width / 2),
          height: Math.abs(height / 2),
        });
      } else if (this.selectedTool === "rhombus") {
        this.drawRhombus({
          type: "rhombus",
          x: this.startX,
          y: this.startY,
          width,
          height,
        });
      } else if (this.selectedTool === "line") {
        this.drawLine({
          type: "line",
          x: this.startX,
          y: this.startY,
          x2: (e.clientX - this.offset.x) / this.scale,
          y2: (e.clientY - this.offset.y) / this.scale,
        });
      } else if (this.selectedTool == "freehand") {
        this.freehandPoints.push({ x, y });
        this.drawFreehand({
          type: "freehand",
          points: this.freehandPoints,
        });
      }
    }
    this.ctx.restore();
  };

  handleZoom = (e: WheelEvent) => {
    e.preventDefault();

    const zoomIntensity = 0.05;
    const zoom = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const worldX = (mouseX - this.offset.x) / this.scale;
    const worldY = (mouseY - this.offset.y) / this.scale;

    this.scale *= zoom;
    this.scale = Math.min(Math.max(this.scale, 0.2), 10);

    this.offset.x = mouseX - worldX * this.scale;
    this.offset.y = mouseY - worldY * this.scale;

    this.redraw();
  };

  handleCursor = (e: MouseEvent) => {
    if (this.isCollaborative && this.socket?.connected) {
      const mouseX = (e.clientX - this.offset.x) / this.scale;
      const mouseY = (e.clientY - this.offset.y) / this.scale;
      this.socket.emit("cursor-move", {
        x: mouseX,
        y: mouseY,
        roomId: this.documentID,
      });
    }
  };

  getScale(): number {
    return this.scale;
  }

  resetZoom() {
    this.scale = 1;
    this.offset.x = 0;
    this.offset.y = 0;
    this.redraw();
  }

  initMouseHandlers() {
    console.log("init mouse handlers", this.isReadonly);

    this.canvas.addEventListener("mousedown", this.mouseDownHanler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.addEventListener("wheel", this.handleZoom);
    this.canvas.addEventListener("mousemove", this.handleCursor);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHanler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvas.removeEventListener("wheel", this.handleZoom);
    this.canvas.removeEventListener("mousemove", this.handleCursor);
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
