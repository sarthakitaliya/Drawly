import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const io = new Server(4000, {
    cors:{
        origin: "http://localhost:3000",
        credentials: true
    },
});

io.use((socket, next) => {
    try {
        console.log("Authenticating user");
        
        const rawCookies = socket.handshake.headers.cookie || "";
        const token = rawCookies
        .split("; ")
        .find((cookie) => cookie.startsWith("next-auth.session-token="))
        ?.split("=")[1];
        
        if (!token) {
            throw new Error("Authentication error");
        }
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        socket.data.user = user;    
        console.log("User authenticated");
        
        next();
    } catch (error) {
        console.error("WebSocket Authentication Failed:", error);
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {
    console.log("User connected");
    
    console.log(`User ${socket.data.user.name} connected`);
    console.log(socket.data.user);
    
    socket.on("connect_error", (error) => {
        console.log(error);
    });
    socket.on("disconnect", () => {
      console.log(`User ${socket.data.user.name} disconnected`);
    });
  });