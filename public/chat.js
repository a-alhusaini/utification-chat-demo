let clientSocket = io.connect();

let button = document.querySelector("button");

button.addEventListener("click", () => {
  clientSocket.emit("chat", "button Clicked!");
});

clientSocket.on("chat", (data) => {
  console.log(data);
});
