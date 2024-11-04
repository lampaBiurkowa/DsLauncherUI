// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;

use configuration::remote_var::RemoteVars;
use launcher_service::{commands::execute::execute, websocket_manager::connect_websocket};
use ndib::commands::{add::add, init::init, update_metadata::update_metadata, remove::remove, pull::pull, publish::publish};
use tauri::Manager;

mod ndib;
mod clients;
mod launcher_service;
mod cache;
mod configuration;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_cli::init())
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .on_window_event(|_sender, event| match event {
            tauri::WindowEvent::Resized(_resized) => {
                std::thread::sleep(std::time::Duration::from_nanos(1));
            }
            _ => {}
        })
        .setup(|app| {
            let (sender, receiver) = tokio::sync::mpsc::channel(100);
            app.manage(sender);
            let remote_vars = tauri::async_runtime::block_on(async move {
                RemoteVars::load().await
            })?;
            app.manage(remote_vars);

            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                Ok(match connect_websocket(receiver, &handle).await {
                    Ok(x) => x,
                    Err(e) => return Err(format!("Failed to connect WebSocket: {e}"))
                })
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![init, add, remove, publish, update_metadata, pull, execute])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
