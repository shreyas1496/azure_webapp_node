const express = require("express");
const websocket = require("websocket");
const http = require("http");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//body parser middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.post("/home", (req, res) => {
  console.log(req.body.name, req.body.stuff);

  res.render("welcome.ejs", {
    name: req.body.name,
    stuff: req.body.age,
  });
});

const server = http.createServer();

server.listen(9898);

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

app.listen(process.env.PORT || 5000, console.log("5000"));
