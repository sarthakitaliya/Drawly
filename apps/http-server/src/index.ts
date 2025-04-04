import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { protectRoute } from "./middleware/auth.middleware";
import documentRoute from "./routes/document.route";
import roomRoute from "./routes/room.route";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  console.log("Request Cookies:", req.cookies);
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Host:", req.headers.host);
  next();
});

app.get("/", (req, res) => {
  console.log(req.user);

  res.json("hello");
});

app.use("/api/documents", protectRoute, documentRoute);
app.use("/api/room", protectRoute, roomRoute);

app.listen(3001);
