export default {
  name: "on",
  alias: ["active", "add", "antistatut", "antimarabou", "responder"],
  category: "owner",
  desc: "Toutes commandes CHOCO",

  async execute(m, { conn, args, isAdmin }) {
    try {
      if (!global.db) global.db = {};
      const cmd = (m.body || "").split(" ")[0].replace(".", "").toLowerCase();

      if (cmd === "on" || cmd === "active") {
        global.db.active = true;
        return await m.reply("✅ CHOCO-LÉGENDE V3 ACTIF! 😈");
      }

      if (cmd === "add") {
        if (!isAdmin) return await m.reply("Admin seulement!");
        if (!args[0]) return await m.reply("Ex:.add 224611257942");
        let num = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await conn.groupParticipantsUpdate(m.chat, [num], "add");
        return await m.reply(`✅ ${args[0]} ajouté!`);
      }

      if (cmd === "antistatut") {
        if (!global.db.antistatut) global.db.antistatut = {};
        if (args[0] === "on") {
          global.db.antistatut[m.chat] = true;
          return await m.reply("✅ AntiStatut ON");
        } else {
          delete global.db.antistatut[m.chat];
          return await m.reply("❌ AntiStatut OFF");
        }
      }

      if (cmd === "antimarabou") {
        if (!global.db.antimarabou) global.db.antimarabou = {};
        if (args[0] === "on") {
          global.db.antimarabou[m.chat] = true;
          return await m.reply("✅ AntiMarabou ON");
        } else {
          delete global.db.antimarabou[m.chat];
          return await m.reply("❌ AntiMarabou OFF");
        }
      }

      if (cmd === "responder") {
        if (!global.db.responder) global.db.responder = {};
        let text = args.join(" ");
        if (!text) return await m.reply("Ex:.responder salut");
        global.db.responder[m.chat] = text;
        return await m.reply(`✅ Responder: ${text}`);
      }

    } catch (e) {
      console.log(e);
      return await m.reply("Erreur: " + e.message);
    }
  }
}