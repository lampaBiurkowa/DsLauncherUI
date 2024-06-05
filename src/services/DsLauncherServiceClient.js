import { executeCommand } from "./DsLauncherService";

export class DsLauncherServiceClient {
    constructor() {
    }

    install(productGuid, libraryPath, exePath) {
        executeCommand(
            "install",
            {
                productGuid: productGuid,
                library: libraryPath,
                exePath: exePath
            }
        );
    }

    getInstallOperations() {
        executeCommand("get-downloads");
    }

    execute(productGuid, exePath) {
        executeCommand(
            "execute",
            {
                productGuid: productGuid,
                exePath: exePath
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