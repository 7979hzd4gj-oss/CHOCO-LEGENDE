export function smsg(conn, m, store) {
  if (!m) return m
  m.chat = m.key.remoteJid
  m.isGroup = m.chat.endsWith('@g.us')
  m.sender = conn.decodeJid(m.key.participant || m.chat)
  if (m.key.fromMe) m.sender = conn.decodeJid(conn.user.id)
  m.mtype = m.message? Object.keys(m.message)[0] : ''
  m.msg = m.message? m.message[m.mtype] : null
  m.text = m.msg?.text || m.msg?.caption || m.msg?.conversation || m.message?.conversation || ""
  m.reply = (text) => conn.sendMessage(m.chat, { text }, { quoted: m })
  return m
}