import { setUser } from '../config';
import { argv } from 'node:process';


type CommandHandler = (cmdName: string, ...args: string[]) => void;
type CommandsRegistry = Record<string, CommandHandler>;

const registry = {} as CommandsRegistry

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
  //console.log(`Command: ${cmdName} registered to ${handler.name}`)
}

function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  if (!(cmdName in registry)) {
    throw new Error('Command not recognized, exiting...')
  }

  console.log(`Running: ${cmdName}`)
  registry[cmdName](cmdName, ...args);

}

function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) throw Error('Login expects username as argument');

  setUser(args[0])
}

function main() {
  if (argv.length < 3) {
    console.log('Not enough arguments.')
    process.exit(1)
  }

  registerCommand(registry, 'login', handlerLogin);
  const args = argv.slice(2,)

  try {
    runCommand(registry, args[0], ...args.slice(1));
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
