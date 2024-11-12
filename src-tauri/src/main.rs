// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;

use cache::{commands::{get_item::get_item, get_items::get_items}, db::Database};
use configuration::{commands::{get_env::get_env, get_remote_vars::get_remote_vars}, remote_vars::RemoteVars};
use launcher_service::{commands::execute::execute, websocket_manager::connect_websocket};
use ndib::commands::{add::add, get_repositories::get_repositories, get_repository_files::get_repository_files, get_repository_metadata::get_repository_metadata, init::init, publish::publish, pull::pull, remove::remove, update_metadata::update_metadata};
use session_data::{commands::{set_session_value::set_session_value, get_session_value::get_session_value}, store::Store};
use utility::read_file_as_base64::read_file_as_base64;
use tauri::Manager;
use tokio::sync::mpsc;
use dotenv::dotenv;

mod ndib;
mod clients;
mod launcher_service;
mod cache;
mod configuration;
mod session_data;
mod utility;

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
            dotenv().ok();
            let app_handle = app.handle().clone();

            tauri::async_runtime::spawn(async move {
                let (sender, receiver) = mpsc::channel(100);
                app_handle.manage(sender);
                match RemoteVars::load().await {
                    Ok(remote_vars) => {
                        app_handle.manage(remote_vars.clone());
                        
                        match Database::try_initialize(remote_vars.clone()).await {
                            Ok(database) => _ = app_handle.manage(database),
                            Err(e) => eprintln!("Failed to initialize database: {:?}", e),
                        }

                        app_handle.manage(Store::new());
                        if let Err(e) = connect_websocket(receiver, &app_handle).await {
                            eprintln!("Failed to connect WebSocket: {:?}", e);
                        }
                    },
                    Err(e) => eprintln!("Failed to load remote variables: {:?}", e),
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            init, add, remove, publish, update_metadata, pull, get_repositories, get_repository_metadata, get_repository_files,
            execute,
            read_file_as_base64,
            get_item, get_items,
            get_remote_vars, get_env,
            set_session_value, get_session_value])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
