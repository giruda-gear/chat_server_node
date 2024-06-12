import WebSocket, { WebSocketServer } from "ws";
import http, { IncomingMessage } from "http";
import { NewRoom } from "./types/Room";
import { SocketLogger } from "./logs/winston";

const server = http.createServer();
const wss = new WebSocket.Server({ server });
const room = NewRoom();

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const cookie = req.headers.cookie;
    const [_, user] = cookie?.split("=") ?? [];

    room.join(ws);

    ws.on("message", (msg: string) => {
        const jsonMsg = JSON.parse(msg);
        jsonMsg.Name = user;
        room.forwardMessage(jsonMsg);
    });

    ws.on("close", () => {
        room.leave(ws);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    SocketLogger.info(`Server started on port = ${PORT}`);
});
