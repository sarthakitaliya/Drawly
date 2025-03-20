import { api } from "@repo/utils/api";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  convertToCollab: async (documentId: string) => {
    try {
      const cachedDocuments = JSON.parse(
        sessionStorage.getItem("documentIds") || "[]"
      );
      const findId = cachedDocuments.find((doc: any) => doc.id === documentId);
      if (findId.isCollaborative) {
        useLoadingStore.getState().setMsg("Document is already collaborative");
        return;
      }
      console.log(documentId);

      await api.post("/room/collab", { documentId });
      cachedDocuments.map((doc: any) => {
        if (doc.id === documentId) {
          doc.isCollaborative = true;
        }
      });
      sessionStorage.setItem("documentIds", JSON.stringify(cachedDocuments));
    } catch (error) {
      console.log(error);
    }
  },
  connectToSocket: (url) => {
    if (get().socket){
      useLoadingStore.getState().setMsg("You are already connected");
      return;
    }
    console.log("Connecting to socket");

    const socket = io(url, {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to socket")
      set({ socket, isConnected: true });
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket")
      set({ socket: null, isConnected: false });
    });
    socket.on("connect_error", (error) => { 
      console.log(error);
    });
    socket.on("error", (error) => {
      console.log(error);
    });
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
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
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
  socket: Socket | null;
  connectToSocket: (url: string) => void;
  joinRoom: (roomId: string) => void;
  sendDrawingData: (data: Element) => void;
  convertToCollab: (documentId: string) => void;
  disconnect: () => void;
  isConnected: boolean;
}
