use futures_util::{SinkExt, StreamExt};
use tauri::{AppHandle, Emitter};
use tokio_tungstenite::connect_async;
use tungstenite::Message;

use super::{error::LauncherServiceError, models::command::Command};


pub(crate) async fn connect_websocket(mut receiver: tokio::sync::mpsc::Receiver<String>, handle: &AppHandle) -> Result<(), LauncherServiceError> {
    let url = format!("ws://localhost:{}", 25219);
    let (ws_stream, _) = connect_async(&url).await?;
    let (mut write, read) = ws_stream.split();

    tokio::spawn(async move {
        while let Some(msg) = receiver.recv().await {
            _ = write.send(Message::Text(msg.clone())).await;
        }
    });

    let handle = handle.clone();
    tokio::spawn(async move {
        let mut read = read;
        while let Some(msg) = read.next().await {
            if let Ok(Message::Text(text)) = msg {
                if let Err(e) = process_message(&text, &handle).await {
                    eprintln!("Error processing message {e}");
                }
            }
        }
    });

    Ok(())
}

async fn process_message(msg: &str, handle: &AppHandle) -> Result<(), tauri::Error>{
    let command = parse_command(msg);
    handle.emit(&command.name, command.args)
}


fn parse_command(command_str: &str) -> Command {
    let lines: Vec<&str> = command_str.lines().collect();
    let mut command = Command {
        name: lines[0].to_string(),
        args: String::default()
    };

    let mut line_index = 1;

    while line_index < lines.len() {
        if !lines[line_index].is_empty() {
            command.args = lines[line_index].into();
        }

        line_index += 1;
    }

    command
}