import { fs } from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/fs";

const SETTINGS_PATH = "settings.json";
const DEFAULT_SETTINGS = {
  theme: "Dark",
  libraries: ["C:/test/test1","C:/test/test2","C:/test/test3"],
  games: {}
};

export async function readOrDefault() {
  if (await fs.exists(SETTINGS_PATH, { dir: BaseDirectory.AppData })) {
    let settings = await fs.readTextFile(SETTINGS_PATH, {
      dir: BaseDirectory.AppData,
    });
    return JSON.parse(settings);
  }
  return DEFAULT_SETTINGS;
}

export async function writeSettings(settings) {
  await fs.writeTextFile(SETTINGS_PATH, JSON.stringify(settings), {
    dir: BaseDirectory.AppData,
  });
}
