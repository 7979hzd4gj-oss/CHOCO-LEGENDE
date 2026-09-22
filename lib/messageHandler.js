import commandHandler from './commandHandler.js'
import config from '../config.js'
export async function handleMessages(sock, chatUpdate) {
 try {
 const m = chatUpdate.messages[0]
 const msg = sock.serializeM(m)
 if (!msg.text) return
 const prefix = config.prefix || '.'
 if (!msg.text.startsWith(prefix)) return
 const args = msg.text.slice(prefix.length).trim().split(/ +/)
 const command = args.shift().toLowerCase()
 const cmd = commandHandler.commands.get(command)
 if (cmd && cmd.execute) await cmd.execute(sock, msg, args)
 } catch (e) { console.log(e) }
}
export async function handleGroupParticipantUpdate() {}
export async function handleStatus() {}
export async function handleCall() {}