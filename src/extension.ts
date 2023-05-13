import * as vscode from "vscode";
import { getTitle } from "./commands";
import { updateStatusBarItem } from "./status-bar";

let intervalId: NodeJS.Timer;

export function activate(context: vscode.ExtensionContext) {
  const getAndSetStatus = async () => {
    const title = await getTitle();
    updateStatusBarItem(title);
  };

  if (intervalId) {
    return;
  }

  getAndSetStatus();

  intervalId = setInterval(() => {
    getAndSetStatus();
  }, 5000);
}

export function deactivate() {
  clearInterval(intervalId);
}
