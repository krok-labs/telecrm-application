use tauri::{tray::{TrayIconBuilder, TrayIconEvent}, Listener, Manager, PhysicalPosition, WindowEvent};
use tauri_plugin_positioner::{Position, WindowExt};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            // Plugins
            app.handle().plugin(tauri_plugin_positioner::init());

            // Tray builder
            TrayIconBuilder::new()
                .on_tray_icon_event(|tray_handle, event| {
                    match event {
                        TrayIconEvent::Click { .. } => {
                            let app = tray_handle.app_handle();
                            let window = app.get_webview_window("main").unwrap();

                            // Showing and moving this window
                            window.show().expect("error while showing window");
                            window.move_window(Position::BottomRight);
                            window.set_focus();
                        },

                        _ => {},
                    };

                    tauri_plugin_positioner::on_tray_event(tray_handle.app_handle(), &event);
                })
                .build(app)?;

            Ok(())
        })
        .on_window_event(|window, event| {
            match event {
                WindowEvent::Focused(false) => {
                    // window.hide();
                },

                _ => {},
            };
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
