let clientSocket = io.connect();

clientSocket.on("chat", (data) => {
  document.querySelector("#chatbox").innerHTML += data;
});

document.querySelector(".blue-btn").addEventListener("click", () => {
  clientSocket.emit("chat", { name: "anonymous", message: "hi" });
});
