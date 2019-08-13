self.onmessage = function(event) {
  console.log("WORKER: Received message", event);
  self.postMessage({ message: "pong" });
}
