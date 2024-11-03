// Dotenv
require('dotenv').config({ path: __dirname + '/.env' });

// Express
const express = require('express');
const app = express();
const http = require('http');

// Cors (Cross-Origin Resource Sharing) Middleware
const cors = require('cors');
app.use(cors());

// Socket.io
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
        methods: ["GET", "POST"],
    }
});

let rooms = {};
let connectedUsers = [];

io.on("connection", (socket) => {

    console.log(`User connected: ${socket.id}`);
    connectedUsers.push(socket.id); 
    
    io.emit('update_users', connectedUsers);

    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        if (!rooms[roomName]) {
            rooms[roomName] = [];
        }
        socket.emit("previous_messages", rooms[roomName]);
        console.log(`User with ID: ${socket.id} joined room: ${roomName}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        rooms[data.room].push(data);
    });

    socket.on("leave_room", (data) => {
        socket.leave(data);
        console.log(`User with ID: ${socket.id} left room: ${data}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        connectedUsers = connectedUsers.filter(user => user !== socket.id);
        io.emit('update_users', connectedUsers); 
    });

});

async function main() {
    server.listen(process.env.APP_PORT, () => {
        console.log(`App listening at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
}

main().catch(console.error);