import fastify from "fastify";
import { Server } from "http";
import { HOST, PORT } from "./lib/env";

const app = fastify()

const httpServer = new Server(app.server);



httpServer.listen(Number(PORT),HOST);
console.log(`server running at: http://${HOST}:${PORT}`)