require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocket, WebSocketServer } = require('ws');
const socket = require("./socket/socket");

const app = express();
const server = http.createServer(app);

// database
const db = require("./models/models");
const ws = require("ws");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db ...");
    })
    .catch((err) => {
        console.log(`err on sync: ${err}`);
    });

// middlewares
const corsOptions = {
    origin: "http://localhost:9000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// start route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome",
    });
});

require("./routes/routes");
const PORT = process.env.PORT // 9000;

// websocket
const wss = new WebSocketServer({
    port: 8113,
    path: "/tronws",
})
const wss2 = new WebSocketServer({
    port: 8114,
    path: "/testws",
});
socket.start(wss);

function heartbeat() {
    this.isAlive = true;
    console.log("HEARTBEAT ... ");
}

wss2.on('connection', function (ws, req) {
    const ip = req.socket.remoteAddress;
    console.log("someone connected IP : ", ip);
    ws.isAlive = true;
    ws.on('pong', heartbeat);
})

const interval = setInterval(function pong() {
   wss2.client.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
   });
}, 30000);

wss2.on('close', function close() {
    clearInterval(interval);
});

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
