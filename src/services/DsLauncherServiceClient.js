import { invoke } from '@tauri-apps/api/core'

export async function executeCommand(commandName, args = {}, head = {}) {
  await invoke("execute", { commandName, args, head });
}

export class DsLauncherServiceClient {
  constructor() {}

  install(productGuid, packageGuid, libraryPath) {
    executeCommand("install", {
      productGuid: productGuid,
      packageGuid: packageGuid,
      library: libraryPath,
    });
    this.getInstallOperations();
  }

  uninstall(productGuid) {
    executeCommand("uninstall", {
      productGuid: productGuid,
    });
  }

  getInstallOperations() {
    executeCommand(
      "get-downloads",
      {},
      {
        workerRepetitions: -1,
        workerInterval: 100,
      }
    );
  }

  execute(productGuid) {
    executeCommand("execute", {
      productGuid: productGuid,
    });
  }

  getInstalled() {
    executeCommand("get-installed");
  }

  getInstalledPath(productGuid) {
    executeCommand("get-installed-path", {
      productGuid: productGuid,
    });
  }

  getRecent() {
    executeCommand("get-recent");
  }

  getLibraries() {
    executeCommand("get-libraries");
  }

  getDeveloperLibraries() {
    executeCommand("get-developer-libraries");
  }

  getLibraryDetails(path) {
    executeCommand("get-library-details", {
      path: path,
    });
  }

  removeLibrary(path) {
    executeCommand("remove-library", {
      library: path,
    });
  }

  addLibrary(path, name, isDeveloper) {
    executeCommand("add-library", {
      library: path,
      name: name,
      isDeveloper: isDeveloper
    });
  }
}
