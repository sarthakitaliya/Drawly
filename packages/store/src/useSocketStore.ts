import { api } from "@repo/utils/api";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { useLoadingStore } from "./useLoadingStore";
import { useCanvasStore } from "./useCanvasStore";

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  onlineUsers: [],
  OtherCursors: {},
  setOtherCursors: (cursor: IncomingCursor) => {
    set((state) => ({
      OtherCursors: {
        ...state.OtherCursors,
        [cursor.userId]: {
          x: cursor.x,
          y: cursor.y,
          userName: cursor.userName,
          color: cursor.color,
        }
      }
    }));
  },
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },
  convertToCollab: async (documentId: string) => {
    try {
      const cachedDocuments = JSON.parse(
        localStorage.getItem("documentIds") || "[]"
      );
      const findId = cachedDocuments.find((doc: any) => doc.id === documentId);
      if (findId.isCollaborative) {
        return;
      }

      const res = await api.post("/room/collab", { documentId });
      if (!res.data.success) {
        useLoadingStore.getState().setMsg("Failed to convert to collaborative");
        return;
      }
      cachedDocuments.map((doc: any) => {
        if (doc.id === documentId) {
          doc.isCollaborative = true;
        }
      });
      localStorage.setItem("documentIds", JSON.stringify(cachedDocuments));
    } catch (error) {
      console.log(error);
    }
  },
  connectToSocket: (url, documentId) => {
    if (get().isConnected || get().socket) {
      return;
    }

    if (!documentId) {
      useLoadingStore.getState().setMsg("Document id is required");
      return;
    }

    const socket = io(url, {
      withCredentials: true,
      query: { roomId: documentId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
      set({ socket, isConnected: true });
      useCanvasStore.getState().setIsCollaborative(true);
      socket.emit("get-users", documentId);
    });

    socket.emit("join-room", documentId);

    socket.on("user-joined", (data) => {
      set({ onlineUsers: data.users });
      console.log(get().onlineUsers);
      useLoadingStore.getState().setMsg(`${data.name} joined`);
    });

    socket.on("online-user", (data) => {
      set({ onlineUsers: data.users });
    });
    socket.on("user-left", (data) => {
      set({ onlineUsers: data.users });
      useLoadingStore.getState().setMsg(`${data.name} left`);
    });

    socket.on("cursor-move", (data) => {
      set((state) => ({
        OtherCursors: {
          ...state.OtherCursors,
          [data.userId]: {
            x: data.x,
            y: data.y,
            userName: data.userName,
            color: data.color,
          },
        },
        
      }));
      console.log(get().OtherCursors);
    });

    socket.on("cursor-remove", (data) => {
      const updatedCursors = { ...get().OtherCursors };
      delete updatedCursors[data.userId];
      console.log("updatedCursors", updatedCursors);
      set({ OtherCursors: updatedCursors });
      console.log("cursor-remove", data);
      console.log("cursor-remove", get().OtherCursors);
      
    });
      
    socket.on("disconnect", (reason) => {
      console.log("Disconnected from socket");
      console.log(reason);

      set({ socket: null, isConnected: false });
    });
    socket.on("connect_error", (error) => {
      console.log(error);

      console.log(error.message);
      set({ socket: null, isConnected: false });
    });
    socket.on("error", (error) => {
      console.log(error);
      set({ socket: null, isConnected: false });
    });
    return socket;
  },
  setSocket: (socket) => {
    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.removeAllListeners();
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

type UserCursor = {
  x: number;
  y: number;
  userName: string;
  color: string;
};

type IncomingCursor = {
  roomId: string;
  x: number;
  y: number;
  userName: string;
  color: string;
  userId: string;
}

interface SocketStore {
  socket: Socket | null;
  onlineUsers: any[];
  OtherCursors: Record<string, UserCursor>;
  setOtherCursors: (cursor: IncomingCursor) => void;
  setOnlineUsers: (users: any[]) => void;
  isConnected: boolean;
  connectToSocket: (url: string, documentId: string) => any;
  setSocket: (socket: Socket) => void;
  convertToCollab: (documentId: string) => void;
  disconnect: () => void;
}
