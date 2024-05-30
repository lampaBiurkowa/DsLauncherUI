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

export async function executeCommand(command, args, head) {
  await websocket.send(
    command + "\n" + formatArgs(head) + "\n\n" + formatArgs(args)
  );
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

  let command = parseCommand(msg.data);

  listeners.forEach((listener) => {
    if (listener.eventType === command.name) {
      listener.callback(command.args ?? {});
    }
  });
}

function formatArgs(args) {
  let argList = [];

  for (var propertyName in args) {
    if (Array.isArray(args[propertyName])) {
      argList.push(`${propertyName}[]:${args[propertyName].length}`);
      args[propertyName].forEach((element, index) => {
        argList.push(`${propertyName}[${index}]:${element}`);
      });
    } else {
      argList.push(`${propertyName}:${args[propertyName]}`);
    }
  }

  return argList.join("\n");
}

function parseCommand(commandStr) {
  let lines = commandStr.split(/\r?\n|\r|\n/g);
  let command = { name: lines[0], head: {}, args: {} };

  let lineIndex = 0;

  while (lines[++lineIndex] != 0) {
    let argName = lines[lineIndex].split(":")[0];
    let argValue = lines[lineIndex].split(":")[1];

    command.head[argName] = argValue;
  }

  while (lines[++lineIndex] != 0) {
    let argName = lines[lineIndex].split(":")[0];
    let argValue = lines[lineIndex].split(":")[1];
    command.args[argName] = argValue;
  }

  return command;
}
