import * as fs from "@tauri-apps/plugin-fs";

const SETTINGS_PATH = "settings.json";
const DEFAULT_SETTINGS = {
  theme: "Dark",
  libraries: ["C:/test/test1", "C:/test/test2", "C:/test/test3"],
  games: {},
};

export async function readOrDefault() {
  if (await fs.exists(SETTINGS_PATH, { dir: fs.BaseDirectory.AppData })) {
    let settings = await fs.readTextFile(SETTINGS_PATH, {
      dir: fs.BaseDirectory.AppData,
    });
    return JSON.parse(settings);
  }
  return DEFAULT_SETTINGS;
}

export async function writeSettings(settings) {
  await fs.writeTextFile(SETTINGS_PATH, JSON.stringify(settings), {
    dir: fs.BaseDirectory.AppData,
  });
}
