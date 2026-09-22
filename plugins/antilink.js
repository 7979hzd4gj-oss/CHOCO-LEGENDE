import fs from 'fs'

export default {
  name: "antilink",
  alias: ["antilien"],
  desc: "Active anti lien",
  async execute(sock, m, args, config) {
    const jid = m.key.remoteJid
    const file = './data/antilink.json'
    let db = {}
    try { db = JSON.parse(fs.readFileSync(file)) } catch {}

    const action = (args[0] || "").toLowerCase()

    if(action === "on"){
      db[jid] = true
      fs.writeFileSync(file, JSON.stringify(db, null, 2))
      return await sock.sendMessage(jid, {text:"✅ *AntiLink ON* 😈\nJe supprime tous les liens maintenant!"}, {quoted: m})
    } else {
      delete db[jid]
      fs.writeFileSync(file, JSON.stringify(db, null, 2))
      return await sock.sendMessage(jid, {text:"❌ *AntiLink OFF*"}, {quoted: m})
    }
  }
}