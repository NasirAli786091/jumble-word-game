import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import { setupSocket } from "./socket/socket";
import { socket } from "@/lib/socket";

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handler = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        handler(req, res);
    });

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    socket.on("register-user", (id) => {
        console.log("registered user", id);
    })

    setupSocket(io);

    httpServer.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
});