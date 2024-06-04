import { addListener } from "./DsLauncherService";
import { DsLauncherServiceClient } from "./DsLauncherServiceClient";

export class UpdateMonitorService {
    constructor() {
    }

    startMonitoring() {
        var anyPending = true;
        addListener("get-downloads", (args) => {
            console.log(args, 'aa');
        });

        var client = new DsLauncherServiceClient();
        setInterval(() => {
            client.getInstallOperations();
        }, 100);
    }
}