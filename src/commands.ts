import { exec } from "child_process";

const GET_TITLE_SCRIPT = `
on getWindowTitle(appName)
	tell application "System Events"
		set appProcess to first application process whose name contains appName
		tell appProcess
			set windowTitle to value of attribute "AXTitle" of window 1
		end tell
	end tell
	return windowTitle
end getWindowTitle

set applicationName to "TIDAL"
set windowTitle to getWindowTitle(applicationName)
return windowTitle
`;

const TOGGLE_PLAY_PAUSE = `
tell application "System Events"
  tell process "TIDAL"
    click menu item 0 of menu "Playback" of menu bar 1
  end tell
end tell
`;

const NEXT_TRACK = `
tell application "System Events"
  tell process "TIDAL"
    click menu item "Next" of menu 1 of menu bar item "Playback" of menu bar 1
  end tell
end tell
`;

const PREVIOUS_TRACK = `
tell application "System Events"
  tell process "TIDAL"
    click menu item "Previous" of menu 1 of menu bar item "Playback" of menu bar 1
  end tell
end tell
`;

const runAppleScript = (script: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`osascript -e '${script}'`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

export const getTitle = (): Promise<string> =>
  runAppleScript(GET_TITLE_SCRIPT)
    .then((result: string) => {
      return result;
    })
    .catch((error) => {
      console.error("AppleScript execution failed:", error);
      return "Tidal Error";
    });

export const playOrPause = async (): Promise<void> => {
  await runAppleScript(TOGGLE_PLAY_PAUSE);
};

export const nextTrack = async (): Promise<void> => {
  await runAppleScript(NEXT_TRACK);
};

export const previousTrack = async (): Promise<void> => {
  await runAppleScript(PREVIOUS_TRACK);
};
