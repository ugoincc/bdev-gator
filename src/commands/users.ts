import { createUser, getUser, resetUsers, getAllUsers } from "src/lib/db/queries/users";
import { setUser, readConfig } from "config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) throw Error('Login expects username as argument');


  const existing = await getUser(args[0])
  if (!existing) throw new Error('Error: Cannot login, username not registered in database.')

  setUser(args[0])
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) throw Error('Register expects username as argument');

  console.log('Registering:' + args[0])

  const existing = await getUser(args[0])
  if (existing) throw new Error('Error: User already registered.')

  const user = await createUser(args[0])
  console.log(`User ${user.name} registered!`)
  setUser(user.name)
}

export async function handlerReset(cmdName: string, ...args: string[]) {
  await resetUsers();
}

export async function handlerGetUsers(cmdName: string, ...args: string[]) {
  const users = await getAllUsers();
  const currentUser = readConfig().currentUserName;
  users.map((user) => {
    console.log(`* ${user.name} ${user.name === currentUser ? '(current)' : ''}`)
  });
}
