import fs from "fs"
import os from "os"

const configFilePath = os.homedir() + '/.gatorconfig.json';

type Config = {
  currentUserName: string;
  dbUrl: string;
}

function writeConfig(cfg: Config): void {
  fs.writeFileSync(configFilePath, JSON.stringify(cfg))
}

export function setUser(username: string) {
  const config = readConfig()
  config.currentUserName = username;
  writeConfig(config)
}

function validateConfig(rawConfig: any): Config {
  return JSON.parse(rawConfig) as Config
}

export function readConfig() {
  const fileString = fs.readFileSync(configFilePath, { encoding: 'utf8' });
  const ValidConfig: Config = validateConfig(fileString)
  return ValidConfig
}

