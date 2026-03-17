import { handlerRegister, handlerLogin, handlerReset, handlerGetUsers } from './users';

type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
type CommandsRegistry = Record<string, CommandHandler>;

export const registry = {} as CommandsRegistry

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  if (!(cmdName in registry)) {
    throw new Error('Command not recognized, exiting...')
  }

  await registry[cmdName](cmdName, ...args);
}

export function registerCommands() {
  registerCommand(registry, 'login', handlerLogin);
  registerCommand(registry, 'register', handlerRegister);
  registerCommand(registry, 'reset', handlerReset);
  registerCommand(registry, 'users', handlerGetUsers);
}
