import { UAParser } from "ua-parser-js"; 
import { v4 as uuidv4 } from "uuid";

export function getDeviceHeader(): string {
  const parser = new UAParser();
  const browser = parser.getBrowser();
  const deviceId = localStorage.getItem("deviceId") || uuidv4();

  if (!localStorage.getItem("deviceId")) {
    localStorage.setItem("deviceId", deviceId);
  }

  const platform = "web";
  const deviceName = `${browser.name} ${browser.version}`;

  return `${deviceId}/${platform}/${deviceName}`;
}
