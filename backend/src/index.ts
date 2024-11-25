// this was in normal node js 


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

import express from "express"
import WebSocket,{WebSocketServer} from "ws"

const app = express()


const httpServer = app.listen(8080)

const wss= new WebSocketServer({server: httpServer})

wss.on('connection', function connection(ws){
    
    ws.on('error',console.error)

    ws.on('message', function(data,isBinary){
       wss.clients.forEach(function each(client){
        if(client.readyState===WebSocket.OPEN){
            client.send(data,{binary: isBinary})
        }
       })
    })
    ws.send("hii there i am server")
})