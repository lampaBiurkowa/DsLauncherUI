import { Command } from "@tauri-apps/plugin-shell";
import PlayingService from "@/services/PlayingService";
import { globalUpdateProgress } from "../App";

const playingService = new PlayingService();

export async function runInstall(appName, path, token, login) {

    const command = Command.sidecar(
        "binaries/ndib-get",
        ["install", `${appName}`, "--json", `--path=${path}`, `--token=${token}`, `--profile=${login}`],
        { encoding: "utf-8" }
    );

    command.stdout.on("data", (line) => {
        try {
            const jsonObject = JSON.parse(line);
            console.log(`${line} ${jsonObject}`);
            console.log(`${jsonObject.BytesTotal}`);
            console.log(`${jsonObject.BytesDownloaded}`);
            console.log(`${jsonObject.Percentage}`);
            globalUpdateProgress.progress = parseInt(jsonObject.Percentage);
            console.log(`wyt ${globalUpdateProgress.progress}`);
        } catch (error) {
            console.error(error);
            console.log(`Invalid json: "${line}"`);
            globalUpdateProgress.progress = 0;
        }
    });

    await command.execute();
    globalUpdateProgress.progress = 100;
}

export async function runStatus(appName, login) {
    const command = Command.sidecar("binaries/ndib-get", ['status', `${appName}`, '--json', `--profile=${login}`])
    const output = await command.execute();
    try {
        console.log(`${output.stdout}`);
        const jsonObject = JSON.parse(output.stdout);
        console.log(`${output.stdout} ${jsonObject}`);
        console.log(`${jsonObject.VersionInNdib}`);
        console.log(`${jsonObject.VersionDescription}`);
        return jsonObject;
    }
    catch
    {
        console.log("not installed")
    }
}

export async function runList(updatable, token, login) {
    let command = null;
    if (updatable)
        command = Command.sidecar("binaries/ndib-get", ['list', '--updatable', '--json', `--token=${token}`, `--profile=${login}`])
    else
        command = Command.sidecar("binaries/ndib-get", ['list', '--json', `--token=${token}`, `--profile=${login}`])

    const output = await command.execute();
    console.log(`${output.stdout}`);
    const jsonObject = JSON.parse(output.stdout);
    console.log(`${output.stdout} ${jsonObject}`);
    console.log(`${jsonObject.Names}`);
    return jsonObject;
}

export async function runGame(appName, appId, userId, path, login) {
    let command = Command.sidecar("binaries/ndib-get", ['run', appName, `--path=${path}`, `--profile=${login}`])

    playingService.tryRegisterGameActivity(appId, userId, login);
    await command.execute();
    playingService.trySubmitCurrentGameActivityEnded();
}

export async function runPurge(appName, path, login) {
    const command = Command.sidecar(
        "binaries/ndib-get",
        ["purge", `${appName}`, "--json", `--path=${path}`, `--profile=${login}`],
        { encoding: "utf-8" }
    );

    var result = await command.execute();
    return result.Succeeded;
}