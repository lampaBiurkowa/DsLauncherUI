import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import "./AudioPage.scss";
import AudioPlayer from "../main/components/AudioPlayer";
import useMusic from "./hooks/useMusic";
import { useParams } from "react-router-dom";
import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";

const api = new DsLauncherApiClient();
const service = new DsLauncherServiceClient();

function AudioPage() {
  const { id: musicGuid } = useParams();
  const music = useMusic(musicGuid);
  const installed = useServiceListener("get-installed-path");
  service.getInstalledPath(musicGuid);
  return (
    <div className="owned-page">
      <h1>{music?.model.name}</h1>
      <div className="apps-list">
        { <AudioPlayer path={installed?.Path} backgroundImage={music?.static.Icon} />
        }
      </div>
    </div>
  );
}

export default AudioPage;