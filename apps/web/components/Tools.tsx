import { useRouter } from "next/navigation";
import { IconButton } from "./IconButton";
import {
  Hand,
  Square,
  Diamond,
  Circle,
  Minus,
  LayoutDashboard,
  Share2,
  Users,
  Plus,
} from "lucide-react";
import { useCanvasStore, useSocketStore } from "@repo/store";
import { useEffect, useState } from "react";

export type Tool = "circle" | "rect" | "rhombus" | "hand" | "line";

export default function Tools({
  selectedTool,
  setSelectedTool,
  canva,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
  canva: any;
}) {
  const { setDocumentID } = useCanvasStore();
  const { convertToCollab, connectToSocket, socket, disconnect } =
    useSocketStore();
  const router = useRouter();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (canva) {
        setScale(canva.getScale());
      }
    };

    const interval = setInterval(updateScale, 100);
    return () => clearInterval(interval);
  }, [canva]);

  const handleZoomIn = () => {
    if (canva) {
      const event = new WheelEvent("wheel", {
        deltaY: -400,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
      canva.handleZoom(event);
    }
  };

  const handleZoomOut = () => {
    if (canva) {
      const event = new WheelEvent("wheel", {
        deltaY: 400,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
      canva.handleZoom(event);
    }
  };

  const connectToRoom = async () => {
    convertToCollab(canva.documentID);
    connectToSocket(
      process.env.NEXT_PUBLIC_SOCKET_URL as string,
      canva.documentID
    );
  };
  const onClickDashboard = () => {
    setDocumentID("");
    router.push("/dashboard");
    disconnect();
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        className="flex items-center justify-between w-full px-7"
      >
        <div className="px-4 py-1 rounded-lg shadow-lg bg-zinc-800">
          <IconButton
            onClick={onClickDashboard}
            icon={<LayoutDashboard size={20} color="white" />}
            title="Dashboard"
          />
        </div>
        <div className="flex gap-3 items-center justify-center px-4 py-1 rounded-lg shadow-lg bg-zinc-800">
          <IconButton
            onClick={() => {
              setSelectedTool("hand");
            }}
            activated={selectedTool === "hand"}
            icon={<Hand size={20} />}
            title="Grab"
          />

          <IconButton
            onClick={() => {
              setSelectedTool("rect");
            }}
            activated={selectedTool === "rect"}
            icon={<Square size={20} />}
            title="Rectangle"
          />

          <IconButton
            onClick={() => {
              setSelectedTool("rhombus");
            }}
            activated={selectedTool === "rhombus"}
            icon={<Diamond size={20} />}
            title="Rhombus"
          />

          <IconButton
            onClick={() => {
              setSelectedTool("circle");
            }}
            activated={selectedTool === "circle"}
            icon={<Circle size={20} />}
            title="Circle"
          />

          <IconButton
            onClick={() => {
              setSelectedTool("line");
            }}
            activated={selectedTool === "line"}
            icon={<Minus size={20} />}
            title="Line"
          />
          <IconButton
            onClick={connectToRoom}
            icon={<Users />}
            activated={socket as any}
            className="border border-zinc-500"
            title="Collaborate Mode"
          />
        </div>
        <div className="px-4 py-1 rounded-lg shadow-lg bg-zinc-800">
          <IconButton
            onClick={() => {
              console.log("Share");
            }}
            icon={<Share2 size={20} color="white" />}
            title="Share"
          />
        </div>
      </div>
      <div
  style={{
    position: "fixed",
    bottom: 15,
    left: 20,
  }}
  className="flex items-center px-4 py-1 gap-4 bg-zinc-800 rounded-xl shadow-lg"
>
  <button
    onClick={handleZoomOut}
    className="p-2 rounded-md hover:bg-zinc-700 transition-colors duration-200"
    title="Zoom Out"
  >
    <Minus size={18} className="text-white" />
  </button>
  
  <span className="text-white text-sm font-medium min-w-[50px] text-center cursor-pointer" title="Reset Zoom" onClick={() => {
    if (canva) {
      canva.resetZoom();
    }
  }}>
    {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
  </span>

  <button
    onClick={handleZoomIn}
    className="p-2 rounded-md hover:bg-zinc-700 transition-colors duration-200"
    title="Zoom In"
  >
    <Plus size={18} className="text-white" />
  </button>
</div>
    </div>
  );
}
