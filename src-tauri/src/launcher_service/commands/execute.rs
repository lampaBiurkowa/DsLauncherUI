use std::collections::HashMap;

use serde_json::Value;
use tauri::command;

#[command]
pub(crate) async fn execute(
    sender: tauri::State<'_, tokio::sync::mpsc::Sender<String>>,
    command_name: String,
    args: Option<HashMap<String, Value>>,
    head: Option<HashMap<String, Value>>,
) -> Result<(), String> {
    let mut command = format!("{}\n", command_name);

    head.map(|x| {
        if x.len() > 0 {
            command += &format!("{}\n", format_args(&x));
        }
    });
    command += "\n";
    args.map(|x| {
        if x.len() > 0 {
            command += &format!("{}\n", format_args(&x));
        }
    });

    sender
        .send(command)
        .await
        .map_err(|e| format!("Failed to send command: {}", e))?;

    Ok(())
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
        Value::String(_) => value.as_str().unwrap().to_owned(),
        _ => value.to_string(),
    }
}
