export default {
  name: "vv1",
  alias: ["viewonce1"],
  category: "owner",
  desc: "Ouvre vue unique 1",
  async execute(m, { conn }) {
    if (!m.quoted) return m.reply("Réponds à une image/video vue unique!");
    try {
      let view = m.quoted.message.viewOnceMessageV2?.message || m.quoted.message.viewOnceMessage?.message;
      if (!view) return m.reply("Ce n'est pas une vue unique!");
      let type = Object.keys(view)[0];
      let media = await conn.downloadMediaMessage(view[type]);
      await conn.sendMessage(m.chat, { [type.replace('Message','')]: media, caption: view[type].caption || '' }, { quoted: m });
    } catch { m.reply("Erreur vv1"); }
  }
}