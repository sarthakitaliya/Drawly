import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { protectRoute } from "./middleware/auth.middleware";
import documentRoute from "./routes/document.route";
import roomRoute from "./routes/room.route";
import shareRoute from "./routes/share.route";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  console.log(req.user);

  res.json("hello");
});

app.use("/api/documents", protectRoute, documentRoute);
app.use("/api/room", protectRoute, roomRoute);
app.use("/api/share", shareRoute)

app.listen(3001);
