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
            }
        );
    }

    uninstall(productGuid) {
        executeCommand(
            "uninstall",
            {
                productGuid: productGuid,
            }
        );
    }

    getInstallOperations() {
        executeCommand(
            "get-downloads",
            {
            },
            {
                workerRepetitions: -1,
                workerInterval: 100,
            }
        );
    }

    execute(productGuid) {
        executeCommand(
            "execute",
            {
                productGuid: productGuid,
            }
        );
    }

    getInstalled() {
        executeCommand("get-installed");
    }

    getLibraries() {
        executeCommand("get-libraries");
    }

    getLibraryDetails(path) {
        executeCommand("get-library-details",
        {
            path: path
        });
    }
}