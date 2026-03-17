import { argv } from 'node:process';
import { registry, registerCommands, runCommand } from './commands/commands'

async function main() {
  if (argv.length < 3) {
    console.log('Not enough arguments.')
    process.exit(1)
  }

  registerCommands();
  const args = argv.slice(2,)

  try {
    await runCommand(registry, args[0], ...args.slice(1));
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }

  process.exit(0)
}

main();
