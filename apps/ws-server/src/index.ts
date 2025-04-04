import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prismaClient } from "@repo/db/client";

dotenv.config();
const io = new Server(4000, {
  cors: {
    origin: process.env.ORIGIN_URL ||"http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type", "Set-Cookie"],
  },
});
const roomUsers: Record<string, { id: string; name: string }[]> = {};

io.use((socket, next) => {
  // Log everything first before any checks
  console.log("=== Debug Logging Start ===");
  console.log("1. Full Handshake:", {
    headers: socket.handshake.headers,
    query: socket.handshake.query,
    auth: socket.handshake.auth
  });
  
  const rawCookies = socket.handshake.headers.cookie;
  console.log("2. Raw Cookies:", rawCookies);
  
  if (!rawCookies) {
    console.log("3. Error: No cookies found in request");
    return next(new Error("No cookies found"));
  }

  // Split and log all cookies
  const cookies = rawCookies.split("; ");
  console.log("4. All Cookies:", cookies);

  // Look for auth token
  const authCookie = cookies.find(
    cookie => cookie.startsWith("next-auth.session-token=") || 
              cookie.startsWith("__Secure-next-auth.session-token=")
  );
  console.log("5. Auth Cookie Found:", authCookie || "none");

  if (!authCookie) {
    console.log("6. Error: No auth cookie found");
    return next(new Error("Authentication error - No auth cookie"));
  }

  const token = authCookie.split("=")[1];
  console.log("7. Token Present:", !!token);

  try {
    console.log("8. Attempting to verify token");
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("9. Token Verified Successfully:", user);
    socket.data.user = user;
    next();
  } catch (error) {
    console.log("10. Token Verification Failed:", error);
    next(new Error(`Authentication error - ${error}`));
  }
  console.log("=== Debug Logging End ===");
});

io.on("connection", (socket) => {
  console.log("User connected");

  console.log(`User ${socket.data.user.name} connected`);
  let roomId = socket.handshake.query.roomId as string;
  console.log("roomID", roomId);
  if (!roomId) {
    console.log("Connection rejected: Missing room ID");
    socket.disconnect(true);
    return;
  }

  socket.join(roomId);
  console.log(`User ${socket.data.user.name} joined room ${roomId}`);
  
  if (!roomUsers[roomId]) roomUsers[roomId] = [];
  roomUsers[roomId].push({ id: socket.id, name: socket.data.user.name });
  console.log("theee", roomUsers);

  socket.broadcast.to(roomId).emit("user-joined", roomUsers[roomId]);

  socket.on("draw", async (data: {shape: any, roomId: string }) => {
    console.log(data);
    socket.broadcast.to(data.roomId).emit("draw", data.shape);
    const { roomId, shape } = data;
    if (!roomId || !shape) return;
    await prismaClient.shape.create({
      data: {
        documentId: roomId,
        x: shape.x,
        y: shape.y,
        type: shape.type,
        width: shape.width,
        height: shape.height,
      },    
    });
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
