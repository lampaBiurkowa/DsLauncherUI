import "./SettingsPage.scss";
import { addListener, executeCommand } from "@/services/DsLauncherService";

function SettingsPage() {
  addListener("testresponse", (args) => {
    console.log(args);
  });

  return (
    <div>
      <button
        onClick={() => {
          executeCommand(
            "test",
            { testNum: 1 },
            {
              workerRepetitions: 3,
              workerInterval: 1000,
            }
          );
        }}
      >
        Test command repetitions 3 interval 1000
      </button>
    </div>
  );
}

export default SettingsPage;
