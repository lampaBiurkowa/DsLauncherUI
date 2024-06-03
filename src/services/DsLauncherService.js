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

export async function executeCommand(commandName, args = {}, head = {}) {
  let command = commandName + "\n";

  if (Object.keys(head).length > 0) {
    command += formatArgs(head) + "\n";
  }
  if (Object.keys(args).length > 0) {
    command += "\n" + formatArgs(args);
  }

  await websocket.send(command);
}

export function addListener(eventType, callback) {
  listeners.push({
    eventType: eventType,
    callback: callback,
  });
}

export function removeListener(eventType, callback) {
  for (let index = 0; index < listeners.length; index++) {
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

  if (msg.data) {
    let command = parseCommand(msg.data);

    listeners.forEach((listener) => {
      if (listener.eventType === command.name) {
        listener.callback(command.args ?? {});
      }
    });
  }
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
    const arg = parseArgument(lines[lineIndex]);
    const array = getArrayInfo(arg.name);
    if (!array) {
      command.head[arg.name] = arg.value;
    } else {
      if (array.index) {
        command.head[arg.name][array.index] = arg.value;
      } else {
        command.head[arg.name] = [];
      }
    }
  }

  while (lines[++lineIndex] != 0) {
    const arg = parseArgument(lines[lineIndex]);
    const array = getArrayInfo(arg.name);
    if (!array) {
      command.args[arg.name] = arg.value;
    } else {
      if (array.index) {
        command.args[array.name][array.index] = arg.value;
      } else {
        command.args[array.name] = [];
      }
    }
  }

  return command;
}

function parseArgument(line) {
  const colonIndex = line.indexOf(":");
  let argName = line.substring(0, colonIndex);
  let argValue = line.substring(colonIndex + 1, line.length);

  return {
    name: argName,
    value: argValue,
  };
}

function getArrayInfo(argName) {
  const arrayRegex = /^(?<name>[a-z]+)\[{1}(?<index>\d*)\]{1}$/g;

  if (argName.match(arrayRegex)) {
    const { name, index } = arrayRegex.exec(argName)?.groups;

    return {
      name: name,
      index: index,
    };
  }
  return false;
}
