import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDeveloperMembers } from "./hooks/useDeveloperMembers";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import SettingsEntry from "@/components/settings-entry/SettingsEntry";
import Dialog from "@/components/dialog/Dialog";
import "./DeveloperMembersPage.scss";
import { ConfigurationHandler } from "@/services/ConfigurationService";

const api = new DsLauncherApiClient();

function DeveloperMembersPage() {
  const { id: devId } = useParams();
  const members = useDeveloperMembers(devId);
  const [codeDialogOpen, setCodeDialogOpen] = useState();
  const [invitationCode, setInvitationCode] = useState();

  return (
    <div className="developer-members-page">
      <section>
        <h2>Invitations</h2>
        <SettingsEntry
          name="Invite a member"
          desc="Generate a new invitation code."
        >
          <button
            className="accent"
            onClick={async () => {
              setInvitationCode(await api.generateInvitationCode(devId));
              setCodeDialogOpen(true);
            }}
          >
            Generate code
          </button>
          <Dialog
            open={codeDialogOpen}
            onClosed={() => setCodeDialogOpen(false)}
            header="Invitation code"
          >
            <div className="code-dialog">
              <span className="notice">
                This is your one-time invitation code. Write it down and share
                it with the person you want to invite. Do not share the code
                with anyone else.
              </span>
              <span className="code">{invitationCode}</span>
              <button
                className="accent"
                onClick={() => setCodeDialogOpen(false)}
              >
                Ok
              </button>
            </div>
          </Dialog>
        </SettingsEntry>
      </section>
      <section>
        <h2>Members</h2>
        {members?.map((member, key) => {
          return (
            <div className="member" key={key}>
              <img
                src={`${ConfigurationHandler.getSupabaseUrl()}/${ConfigurationHandler.getCoreApiUrl()}/${member?.profileImage}`}
                alt="Member profile image"
              />
              <span className="name">
                {member.name} {member.surname}
              </span>
              <span className="login">{member.alias}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default DeveloperMembersPage;
