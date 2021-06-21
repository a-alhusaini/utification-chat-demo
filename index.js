let express = require("express");
let ServerSDK = require("utification-sdk/dist/server");
let socket = require("socket.io");

let serverSDK = new ServerSDK(
  "df86eac4-8e13-4593-982f-10ed80971fb5",
  "b393a7eb-c67a-4102-8a86-8b0f71c325d9"
);

let app = express();

app.use(express.static("public"));

let server = app.listen(3000, () => {
  console.log("listening on 3000");
});

let io = socket(server);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
    serverSDK.sendNotification(
      {},
      { title: "notification title", body: "notification body" }
    );
  });
});
