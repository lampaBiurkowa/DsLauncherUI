import WebSocket from "@tauri-apps/plugin-websocket";
import { getMatches } from "@tauri-apps/plugin-cli";

const DEFAULT_PORT = 25219;
const matches = await getMatches();
let listeners = [];

try {
  const websocket = WebSocket.connect(
    `ws://localhost:${matches.args.port?.value ?? DEFAULT_PORT}`
  );
  websocket.addListener(processMessage);
} catch (error) {
  console.log(error);
}

export function executeCommand(command) {}

export function addListener(eventType, callback) {
  listeners.push({
    eventType: eventType,
    callback: callback,
  });
}

export function removeListener(eventType, callback) {
  for (let index = 0; index < array.length; index++) {
    const listener = listeners[index];

    if (listener.eventType === eventType && listener.callback === callback) {
      listeners.splice(index--, 1);
    }
  }
}

function processMessage(msg) {
  listeners.forEach((listener) => {
    if (listener.eventType === msg.eventType) {
      listener.callback(msg.args ?? {});
    }
  });
}
