import { setUser, readConfig, } from '../config';
import { argv } from 'node:process';


type CommandHandler = (cmdName: string, ...args: string[]) => void;
type CommandsRegistry = Record<string, CommandHandler>;

const registry = {} as CommandsRegistry

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
  console.log(`Command: ${cmdName} registered to ${handler.name}`)
}

function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {

}

function handlerLogin(cmdName: string, ...args: string[]) {
  if (!args) throw Error('Login expects username as argument');

  try {
    setUser(args[0])
  } catch (e) {
    console.log('Failed')
  }
}

function main() {
  argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  })

  if (argv.length < 3) {
    console.log('Not enough arguments.')
    process.exit(1)
  }

  const args = argv.slice(2,)
  console.log(`Sliced Arguments = ${args}`);

  registerCommand(registry, 'login', handlerLogin);
}

main();
