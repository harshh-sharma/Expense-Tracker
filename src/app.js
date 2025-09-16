import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import googleRoutes from "./modules/auth/google.auth.route.js";
import passport from "passport";

import "./config/passport.js";
import userRoute from "./modules/auth/auth.route.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Socket.IO events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.use("/auth", googleRoutes);
app.use("/api/users",userRoute);

app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});

export default app;
