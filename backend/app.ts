import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";



export const app: Express = express();
export const httpServer = createServer(app);

//socket io
export const io: Server = new Server(httpServer, {
  cors: { origin: "http://localhost:4200" },
});