import express from "express";
import http from "http";
import { Server } from "socket.io"; // Update the import statement

import orderRoutes from "./routes/orders.js";
import itemRoutes from "./routes/items.js";

const app = express();
const server = http.createServer(app); // Create an HTTP server

export const io = new Server(server, { // Update the constructor call
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);

io.on("connection", (socket) => {
  console.log("New WebSocket connection established");
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});

const PORT = 8800;
server.listen(PORT, () => {
  console.log(`Connected! WebSocket server running on port ${PORT}`);
});
