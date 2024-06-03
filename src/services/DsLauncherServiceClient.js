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
}