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
} from "lucide-react";
import { useCanvasStore, useSocketStore } from "@repo/store";
export type Tool = "circle" | "rect" | "rhombus" | "hand" | "line";

export default function ToolBar({
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

  
  const connectToRoom = async () => {
    convertToCollab(canva.documentID);
    connectToSocket(process.env.NEXT_PUBLIC_SOCKET_URL as string, canva.documentID);
  };
  const onClickDashboard = () => {
    setDocumentID("");
    router.push("/dashboard");
    disconnect();
  };
  
  return (
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
  );
}
