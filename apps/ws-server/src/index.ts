import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prismaClient } from "@repo/db/client";

dotenv.config();
const io = new Server(4000, {
  cors: {
    origin: process.env.ORIGIN_URL || "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type", "Set-Cookie"],
  },
});
const roomUsers: Record<string, { id: string; name: string, userId: string }[]> = {};

io.use((socket, next) => {
  console.log("hi");
  console.log("Handshake Headers:", socket.handshake.headers);
  console.log("Socket Handshake Query:", socket.handshake.query);

  try {
    console.log("Socket Auth");
    console.log("Socket Handshake Headers:", socket.handshake.headers);

    const rawCookies = socket.handshake.headers.cookie;
    if (!rawCookies) {
      return next(new Error("No cookies found"));
    }

    const token = rawCookies
      .split("; ")
      .find(
        (cookie) =>
          cookie.startsWith("next-auth.session-token=") ||
          cookie.startsWith("__Secure-next-auth.session-token=")
      )
      ?.split("=")[1];
    console.log("token", token);
    if (!token) {
      return next(new Error("Authentication error"));
    }
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    socket.data.user = user;
    next();
  } catch (error) {
    console.log(error);

    console.error("WebSocket Authentication Failed:", error);
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  let roomId = socket.handshake.query.roomId as string;
  if (!roomId) {
    console.log("Connection rejected: Missing room ID");
    socket.disconnect(true);
    return;
  }

  socket.join(roomId);

  if (!roomUsers[roomId]) roomUsers[roomId] = [];
  roomUsers[roomId].push({ id: socket.id, name: socket.data.user.name, userId: socket.data.user.id });
  console.log("theee", roomUsers);

  socket.broadcast.to(roomId).emit("user-joined", {
    name: socket.data.user.name,
    users: roomUsers[roomId],
  });
  socket.on("get-users", (roomId: string) => {
    console.log("get-users", roomId);
    if (!roomId) return;
    socket.emit("online-user", {
      name: socket.data.user.name,
      users: roomUsers[roomId],
    });
  });
  socket.on("draw", async (data: { shape: any; roomId: string }) => {
    console.log(data);
    socket.broadcast.to(data.roomId).emit("draw", data.shape);
    const { roomId, shape } = data;
    if (!roomId || !shape) return;
    if (shape.type === "line") {
      await prismaClient.shape.create({
        data: {
          type: shape.type,
          documentId: roomId,
          x: shape.x,
          y: shape.y,
          x2: shape.x2,
          y2: shape.y2,
        },
      });
    } else {
      await prismaClient.shape.create({
        data: {
          type: shape.type,
          documentId: roomId,
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height,
        },
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.data.user.name} disconnected`);
    for (const roomId in roomUsers) {
      if (!roomUsers[roomId]) return;
      roomUsers[roomId] = roomUsers[roomId].filter(
        (user) => user.id !== socket.id
      );
      socket.broadcast.to(roomId).emit("user-left", {
        name: socket.data.user.name,
        users: roomUsers[roomId],
      });
    }
    console.log("lefter", roomUsers);
  });
});
