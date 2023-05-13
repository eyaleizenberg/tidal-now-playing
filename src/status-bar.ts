import * as vscode from "vscode";

const statusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  100
);

export const updateStatusBarItem = (songName: string) => {
  const textToShow =
    songName === "TIDAL" ? "Nothing Playing" : `Now Playing: ${songName}`;
  statusBarItem.text = `$(play-circle) ${textToShow}`;
  statusBarItem.show();
};
