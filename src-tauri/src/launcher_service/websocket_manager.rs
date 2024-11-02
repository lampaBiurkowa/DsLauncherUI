use std::collections::HashMap;

use futures_util::{SinkExt, StreamExt};
use serde_json::Value;
use tauri::{command, AppHandle, Emitter};
use tokio_tungstenite::connect_async;
use tungstenite::Message;

use super::{error::LauncherServiceError, models::command::Command};


pub(crate) async fn connect_websocket(mut receiver: tokio::sync::mpsc::Receiver<String>, handle: &AppHandle) -> Result<(), LauncherServiceError> {
    let url = format!("ws://localhost:{}", 25219);
    let (ws_stream, _) = connect_async(&url).await?;
    let (mut write, read) = ws_stream.split();

    tokio::spawn(async move {
        while let Some(msg) = receiver.recv().await {
            write.send(Message::Text(msg.clone())).await.unwrap();
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
    let command = parse_command(&msg);
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

fn format_args(args: &HashMap<String, Value>) -> String {
    let mut arg_list = vec![];

    for (key, value) in args {
        if let Value::Array(arr) = value {
            arg_list.push(format!("{}[]:{}", key, arr.len()));
            for (index, element) in arr.iter().enumerate() {
                arg_list.push(format!("{}[{}]:{}", key, index, value_to_string(element)));
            }
        } else {
            arg_list.push(format!("{}:{}", key, value_to_string(value)));
        }
    }

    arg_list.join("\n")
}

fn value_to_string(value: &Value) -> String {
    match value {
        Value::String(x) => value.as_str().unwrap().to_owned(),
        _ => value.to_string()
    }
}

#[command]
pub(crate) async fn execute_command(
    sender: tauri::State<'_, tokio::sync::mpsc::Sender<String>>,
    command_name: String,
    args: Option<HashMap<String, Value>>,
    head: Option<HashMap<String, Value>>) -> Result<(), String> {
    let mut command = format!("{}\n", command_name);

    if let Some(head_args) = &head {
        command += &format!("{}\n", format_args(head_args));
    }
    if let Some(command_args) = &args {
        command += &format!("\n{}", format_args(command_args));
    }
 
    sender
        .send(command)
        .await
        .map_err(|e| format!("Failed to send command: {}", e))?;

    Ok(())
}