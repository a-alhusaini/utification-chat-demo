if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
let clientSocket = io.connect();
let clientSDK = new utificationSdk("b393a7eb-c67a-4102-8a86-8b0f71c325d9");

document.querySelector("#subscribe").addEventListener("click", async () => {
  let reg = await navigator.serviceWorker.ready;

  await clientSDK.subscribe(reg);
});

clientSocket.on("chat", (data) => {
  console.log(data);
  document.querySelector(
    "#chatbox"
  ).innerHTML += `<div><strong>${data.name}</strong>: ${data.message}</div>`;
});

document.querySelector(".blue-btn").addEventListener("click", () => {
  clientSocket.emit("chat", {
    name: document.querySelector("#name").value,
    message: document.querySelector("#message").value,
  });
});
