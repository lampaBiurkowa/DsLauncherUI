import { executeCommand } from "./DsLauncherService";

export class DsLauncherServiceClient {
    constructor() {
    }

    install(productGuid, libraryPath) {
        executeCommand(
            "install",
            {
                productGuid: productGuid,
                library: libraryPath
            },
            {
                workerRepetitions: 1,
                workerInterval: 1000,
            }
        );
    }

    getInstallOperations() {
        executeCommand(
            "get-downloads",
            {
            },
            {
                workerRepetitions: 1,
                workerInterval: 1000,
            }
        );
    }

    execute(productGuid, exePath) {
        executeCommand(
            "execute",
            {
                productGuid: productGuid,
                exePath: exePath
            },
            {
                workerRepetitions: 1,
                workerInterval: 1000,
            }
        );
    }
    
    getInstalled() {
        executeCommand(
            "get-installed",
            {
            },
            {
                workerRepetitions: 1,
                workerInterval: 1000,
            }
        );
    }
}