![Utification Logo](https://utification.appdevland.tech/logo.png "Utification logo")

# Utification chat app demo

This is a demo for [Utification](https://utification.appdevland.tech) that sends a notification whenever someone sends you a chat message. It uses Express.js and socket.io

# How it works

## Service worker

LOCATION: public/sw.js

This is a really important part about this project. *With other notification platforms they require you to use a massive server that makes your website slower!* Instead Utification is completely custom. You can put anything you want in your service worker and that gives you lots of customization!

<pre>
let data;

// open the page when a person clicks the notification
self.addEventListener("notificationclick", (event) => {
  clients.openWindow("/");
});

// notification options is an object that can have any data you want
self.addEventListener("push", (event) => {
  // data is stored blobally so that you can do stuff with it
  data = JSON.parse(event.data.text());
  let { notificationOptions } = data;

  // trigger a notification
  registration.showNotification(notificationOptions.title, {
    ...notificationOptions,
  });
});

</pre>

## Manifest json

LOCATION: public/manifest.json

You need a manifest json file in order for a service worker to function

## Clientside javascript

LOCATION: public/chat.js

This is all that's required for the client side SDK

<pre>
// initialize the client side SDK with your own project ID
let clientSDK = new utificationSdk("b393a7eb-c67a-4102-8a86-8b0f71c325d9");

document.querySelector("#subscribe").addEventListener("click", async () => {
  // wait for service worker to be ready
  let reg = await navigator.serviceWorker.ready;

  // register the service worker
  await clientSDK.subscribe(reg);
});

</pre>

## Server

LOCATION: index.js

<pre>
let ServerSDK = require("utification-sdk/dist/server");

// the first argument is your API key
// the second argument is the project ID
let serverSDK = new ServerSDK(
  "df86eac4-8e13-4593-982f-10ed80971fb5",
  "b393a7eb-c67a-4102-8a86-8b0f71c325d9"
);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);

    // Send a notification to everyone that matches the filter
    // The filter is the first argument. It supports anything that can be put in a mongodb find query
    // The filter is based on what you store when someone subscribes or when you update a subscription
    // Second argument is the notificationOptions that is sent to the service worker see sw.js
    serverSDK.sendNotification(
      {},
      { title: "notification title", body: "notification body" }
    );
  });
});
</pre>

# Running the project locally

First you will need to change the values in `public/chat.js` and `index.js` to your own credentials which you can get from the [utification dashboard](https://utification.appdevland.tech).

After that it's just like any nodejs project

<pre>
npm install
node index.js
</pre>

# support Utification on [patreon](https://patreon.com/appdevland)

This project is compeltely free and relies on donations. If you want to support it then donate to our [patreon](https://patreon.com/appdevland)!
