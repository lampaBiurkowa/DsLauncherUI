use tauri::command;

use crate::configuration::remote_var::RemoteVars;

#[command]
pub(crate) fn get_remote_vars(
    vars: tauri::State<'_, RemoteVars>
) -> Result<RemoteVars, String> {
    Ok(vars.inner().clone())
}