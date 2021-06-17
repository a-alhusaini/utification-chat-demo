let express = require("express");
let socket = require("socket.io");

let app = express();

app.use(express.static("public"));

let server = app.listen(3000, () => {
  console.log("listening on 3000");
});

let io = socket(server);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});
