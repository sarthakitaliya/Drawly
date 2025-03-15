import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws) => {
    console.log("connected");
    ws.send("message")
    
})