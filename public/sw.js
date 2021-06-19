"use strict";

let data;

self.addEventListener("install", () => console.log("installed"));
self.addEventListener("activate", () => console.log("activated"));

self.addEventListener("notificationclick", (event) => {
  clients.openWindow("/");
});

self.addEventListener("push", (event) => {
  data = JSON.parse(event.data.text());
  let { notificationOptions } = data;
  registration.showNotification(notificationOptions.title, {
    ...notificationOptions,
  });
});
