import { commands, ExtensionContext } from "vscode";
import { getTitle, nextTrack, playOrPause, previousTrack } from "./commands";
import { updateStatusBarItem } from "./status-bar";

let intervalId: NodeJS.Timer;

export function activate(context: ExtensionContext) {
  commands.registerCommand("tidal-now-playing.pause-play", () => {
    playOrPause();
  });

  commands.registerCommand("tidal-now-playing.next-track", () => {
    nextTrack();
  });

  commands.registerCommand("tidal-now-playing.previous-track", () => {
    previousTrack();
  });

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
