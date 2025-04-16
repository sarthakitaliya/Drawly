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
import Image from "next/image";
import { useSession } from "next-auth/react";
import Share from "./Share";

export type Tool = "circle" | "rect" | "rhombus" | "hand" | "line";

export default function Tools({
  selectedTool,
  setSelectedTool,
  canva,
  members,
  isReadonly,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
  canva: any;
  members: any[];
  isReadonly: boolean;
}) {
  const { data: session } = useSession();
  const { setDocumentID, isCollaborative } = useCanvasStore();
  const { convertToCollab, connectToSocket, socket, disconnect, onlineUsers } =
    useSocketStore();
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const [isShareOpen, setIsShareOpen] = useState(false);
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
  const isUserOnline = (userId: string) => {
    return onlineUsers.some((user) => user.userId === userId);
  };
  return (
    <div>
      {isShareOpen && <Share OnClose={() => setIsShareOpen(false)} />}
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
            onClick={() => {
              if (isReadonly) {
                router.push("/api/auth/signin");
                return;
              } else {
                onClickDashboard();
              }
            }}
            icon={<LayoutDashboard size={20} color="white" />}
            title={isReadonly ? "Login" : "Dashboard"}
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
              if (isReadonly) return;
              setSelectedTool("rect");
            }}
            activated={selectedTool === "rect"}
            icon={<Square size={20} />}
            title={isReadonly ? "Read-only mode" : "Rectangle"}
          />

          <IconButton
            onClick={() => {
              if (isReadonly) return;
              setSelectedTool("rhombus");
            }}
            activated={selectedTool === "rhombus"}
            icon={<Diamond size={20} />}
            title={isReadonly ? "Read-only mode" : "Rhombus"}
          />

          <IconButton
            onClick={() => {
              if (isReadonly) return;
              setSelectedTool("circle");
            }}
            activated={selectedTool === "circle"}
            icon={<Circle size={20} />}
            title={isReadonly ? "Read-only mode" : "Circle"}
          />

          <IconButton
            onClick={() => {
              if (isReadonly) return;
              setSelectedTool("line");
            }}
            activated={selectedTool === "line"}
            icon={<Minus size={20} />}
            title={isReadonly ? "Read-only mode" : "Line"}
          />
          <IconButton
            onClick={() => {
              if (isReadonly) return;
              connectToRoom();
            }}
            icon={<Users />}
            activated={socket as any}
            className="border border-zinc-500"
            title={isReadonly ? "Read-only mode" : "Collaborative mode"}
          />
        </div>
        <div className="px-4 py-1 rounded-lg shadow-lg bg-zinc-800">
          <IconButton
            onClick={() => {
              if (isReadonly) return;
              setIsShareOpen(!isShareOpen);
            }}
            icon={<Share2 size={20} color="white" />}
            title={isReadonly ? "Read-only mode" : "Share"}
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
          className="p-2 rounded-md hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
          title="Zoom Out"
        >
          <Minus size={18} className="text-white" />
        </button>

        <span
          className="text-white text-sm font-medium min-w-[50px] text-center cursor-pointer"
          title="Reset Zoom"
          onClick={() => {
            if (canva) {
              canva.resetZoom();
            }
          }}
        >
          {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
        </span>

        <button
          onClick={handleZoomIn}
          className="p-2 rounded-md hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
          title="Zoom In"
        >
          <Plus size={18} className="text-white" />
        </button>
      </div>
      {isCollaborative && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 25,
          }}
          className="bg-zinc-800 p-2.5 rounded-lg shadow-lg group"
        >
          <Users
            size={20}
            className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-200"
          />
          <div className="absolute right-0 bottom-10 bg hidden group-hover:block bg-zinc-800 border border-green-100 text-white rounded-xl shadow-lg p-4 w-64 max-h-64 overflow-y-auto">
            <h4 className="text-sm font-semibold mb-2 border-b pb-2">
              Members
            </h4>
            {members.map((member) => (
              <div
                key={member.user.id}
                className="flex justify-between items-center py-1"
              >
                <Image
                  src={member.user.image}
                  alt={member.user.name}
                  width={30}
                  height={30}
                  className="rounded-full mr-2"
                />
                <span>{member.user.name}</span>
                {member.user.id == session?.user.id ? (
                  <span className="text-zinc-500">(You)</span>
                ) : null}
                <span
                  className={`w-2 h-2 rounded-full ${isUserOnline(member.user.id) ? "bg-green-500" : "bg-gray-500"}`}
                ></span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
