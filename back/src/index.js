const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const setupSocket = require('./socket');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

setupSocket(io); // 🧠 подключаем обработчики

const PORT = process.env.APP_PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
