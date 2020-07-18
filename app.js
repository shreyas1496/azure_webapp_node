const websocket = require("websocket");
const http = require("http");

const server = http.createServer();

server.listen(process.env.PORT || 443, console.log("5000"));

const wsServer = new websocket.server({
  httpServer: server,
});

wsServer.on("request", (request) => {
  const connection = request.accept(undefined, request.origin);
  console.log("joined");

  connection.on("message", async (post) => {
    const { from, message } = JSON.parse(post.utf8Data || "");
    wsServer.broadcastUTF(post.utf8Data);
  });
  connection.on("close", () => {
    console.log("Client has disconnected.");
  });
});

wsServer.on("error", console.log);
