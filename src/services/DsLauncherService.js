import WebSocket from "@tauri-apps/plugin-websocket";
import { getMatches } from "@tauri-apps/plugin-cli";
import { exit } from "@tauri-apps/plugin-process";

const DEFAULT_PORT = 25219;
const matches = await getMatches();

let listeners = [];

const websocket = await WebSocket.connect(
  `ws://localhost:${matches.args.port?.value ?? DEFAULT_PORT}`
);
websocket.addListener(processMessage);

export function executeCommand(command, args) {
  websocket.send(command + "\n" + formatArgs(args));
}

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
  if (msg.data.code >= 1000 && msg.data.code <= 4999) {
    exit(0);
  }

  listeners.forEach((listener) => {
    if (listener.eventType === msg.eventType) {
      //listener.callback(msg.args ?? {});
    }
  });
}

function formatArgs(args) {
  let argList = [];

  for (var propertyName in args) {
    if (Array.isArray(args[propertyName])) {
      argList.push(`${propertyName}[]:${args[propertyName].length}`);
      args[propertyName].forEach((element, index) => {
        argList.push(`${propertyName}[${index}]:${JSON.stringify(element)}`);
      });
    } else {
      argList.push(`${propertyName}:${JSON.stringify(args[propertyName])}`);
    }
  }

  return argList.join("\n");
}
