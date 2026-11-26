import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handler = app.getRequestHandler();

const PORT = Number(process.env.PORT) || 3000;

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        handler(req, res);
    });

    const io = new Server(httpServer, {
        cors: {
            origin: [
                "http://localhost:3000",
                "https://score-word.vercel.app",
            ],
            methods: ["GET", "POST"],
        },
    });

    setupSocket(io);

    httpServer.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
});