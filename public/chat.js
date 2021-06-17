let clientSocket = io.connect();

clientSocket.on("chat", (data) => {
  console.log(data);
  document.querySelector(
    "#chatbox"
  ).innerHTML += `<strong>${data.name}</strong>: ${data.message}`;
});

document.querySelector(".blue-btn").addEventListener("click", () => {
  clientSocket.emit("chat", {
    name: document.querySelector("#name").value,
    message: document.querySelector("#message").value,
  });
});
