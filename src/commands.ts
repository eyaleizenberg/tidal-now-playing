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
