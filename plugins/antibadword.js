import fs from 'fs'
export default {
 name: "antibadword",
 alias: ["antigrosmot"],
 desc: "Active anti gros mot",
 async execute(sock, m, args) {
  const jid = m.key.remoteJid
  const file = './data/antibadword.json'
  let db = {}
  try { db = JSON.parse(fs.readFileSync(file)) } catch {}
  if((args[0]||"").toLowerCase()==="on"){
    db[jid]=true
    fs.writeFileSync(file, JSON.stringify(db, null, 2))
    return sock.sendMessage(jid, {text:"✅ *AntiBadWord ON* 😈"}, {quoted:m})
  } else {
    delete db[jid]
    fs.writeFileSync(file, JSON.stringify(db, null, 2))
    return sock.sendMessage(jid, {text:"❌ *AntiBadWord OFF*"}, {quoted:m})
  }
 }
}