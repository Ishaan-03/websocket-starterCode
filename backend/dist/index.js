"use strict";
// this was in normal node js 
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import WebSocket, { WebSocketServer } from "ws";
// import http from "http";
// // Create HTTP server
// const server = http.createServer((req, res) => {
//     console.log(`${new Date()} - Request for ${req.url}`);
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hi there!");
// });
// // Create WebSocket server
// const wss = new WebSocketServer({ server });
// // Handle WebSocket connections
// wss.on('connection', (socket) => {
//     console.log('New client connected');
//     // Handle errors on the socket
//     socket.on('error', console.error);
//     // Handle incoming messages
//     socket.on('message', (data, isBinary) => {
//         // Broadcast the message to all connected clients
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data, { binary: isBinary });
//             }
//         });
//     });
//     // Send a welcome message to the connected client
//     socket.send('Hello! Message from the server.');
// });
// // Start the HTTP server
// server.listen(8080, () => {
//     console.log('Server is listening on port 8080');
// });
// using express 
const express_1 = __importDefault(require("express"));
const ws_1 = __importStar(require("ws"));
const app = (0, express_1.default)();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function (data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("hii there i am server");
});
