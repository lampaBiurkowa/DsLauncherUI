import { Command } from "@tauri-apps/api/shell";


export async function runInstall(appName, path) {
    const command = Command.sidecar(
        "binaries/ndib-get",
        ["install", appName, "--json", `--path=${path}`],
        { encoding: "utf-8" }
    );

    command.stdout.on("data", (line) => {
        try {
            const jsonObject = JSON.parse(line);
            console.log(`${line} ${jsonObject}`);
            console.log(`${jsonObject.BytesTotal}`);
            console.log(`${jsonObject.BytesDownloaded}`);
            console.log(`${jsonObject.Percentage}`);
        } catch {
            console.log(`Invalid json: "${line}"`);
        }
    });

    await command.execute();
}

export async function runStatus(appName) {
    const command = Command.sidecar("binaries/ndib-get", ['status', appName, '--json'])
    const output = await command.execute();
    try {
        console.log(`${output.stdout}`);
        const jsonObject = JSON.parse(output.stdout);
        console.log(`${output.stdout} ${jsonObject}`);
        console.log(`${jsonObject.VersionInNdib}`);
        console.log(`${jsonObject.VersionDescription}`);
    }
    catch
    {
        console.log("not installed")
    }
    await command.execute();
}

export async function runList(updatable) {
    let command = null;
    if (updatable)
        command = Command.sidecar("binaries/ndib-get", ['list', '--updatable', '--json'])
    else
        command = Command.sidecar("binaries/ndib-get", ['list', '--json'])

    const output = await command.execute();
    console.log(`${output.stdout}`);
    const jsonObject = JSON.parse(output.stdout);
    console.log(`${output.stdout} ${jsonObject}`);
    console.log(`${jsonObject.Names}`);
}