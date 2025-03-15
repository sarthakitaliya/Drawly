import { create } from "zustand";

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  connect: (url) => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
      set({ socket: null });
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    set({ socket });
  },
  joinRoom: (roomId) => {
    const { socket } = get();
    if (socket) {
      socket.send(JSON.stringify({ type: "joinRoom", payload: { roomId } }));
    }
  },
  sendDrawingData: (data) => {
    const { socket } = get();
    if (socket) {
      socket.send(JSON.stringify({ type: "draw", payload: data }));
    }
  },
}));

type Element = {
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
};
interface SocketStore {
  socket: WebSocket | null;
  connect: (url: string) => void;
  joinRoom: (roomId: string) => void;
  sendDrawingData: (data: Element) => void;
}
