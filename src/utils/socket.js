const { io } = require("socket.io-client");

const socket = io("wss://api-23eqo.ondigitalocean.app", {
  transports: ["websocket"],
  upgrade: false,
});

export default socket