export default {
  name: "menu",
  alias: ["vv1","vv2","antistatut","antimarabou","responder","on","off","add"],
  desc: "Menu 300 tout en 1",
  category: "all",

  async execute(sock, m, args, config) {
    try {
      const body = (m.message?.conversation || m.message?.extendedTextMessage?.text || "");
      const prefix = config?.prefix || ".";
      const cmd = body.slice(prefix.length).trim().split(/ +/)[0].toLowerCase();
      const txt = body.slice(prefix.length).trim().split(/ +/).slice(1).join(" ");
      const jid = m.key.remoteJid;

      if (!global.db) global.db = {};
      if (!global.db.antistatut) global.db.antistatut = {};
      if (!global.db.antimarabou) global.db.antimarabou = {};
      if (!global.db.responder) global.db.responder = {};

      // VV1 - Vue unique 1
      if(cmd === "vv1"){
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if(!quoted) return await sock.sendMessage(jid, {text:"❌ Réponds à une vue unique!"}, {quoted: m});
        const view = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessage?.message;
        if(!view) return await sock.sendMessage(jid, {text:"❌ Pas une vue unique"}, {quoted: m});
        const type = Object.keys(view)[0];
        const buffer = await sock.downloadMediaMessage({message: view});
        const sendType = type.replace("Message","").toLowerCase();
        return await sock.sendMessage(jid, {[sendType]: buffer, caption: "✅ VV1 by CHOCO V3 😈"}, {quoted: m});
      }

      // VV2
      if(cmd === "vv2"){
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if(!quoted) return await sock.sendMessage(jid, {text:"❌ Réponds à vv2!"}, {quoted: m});
        const view = quoted.viewOnceMessageV2Extension?.message;
        if(!view) return await sock.sendMessage(jid, {text:"❌ Pas vv2"}, {quoted: m});
        const type = Object.keys(view)[0];
        const buffer = await sock.downloadMediaMessage({message: view});
        const sendType = type.replace("Message","").toLowerCase();
        return await sock.sendMessage(jid, {[sendType]: buffer, caption: "✅ VV2 by CHOCO V3 😈"}, {quoted: m});
      }

      if(cmd === "antistatut"){
        if(txt === "on"){ global.db.antistatut[jid]=true; return await sock.sendMessage(jid, {text:"✅ AntiStatut ON 😈"}, {quoted:m}); }
        else { delete global.db.antistatut[jid]; return await sock.sendMessage(jid, {text:"❌ AntiStatut OFF"}, {quoted:m}); }
      }

      if(cmd === "antimarabou"){
        if(txt === "on"){ global.db.antimarabou[jid]=true; return await sock.sendMessage(jid, {text:"✅ AntiMarabou ON 😈"}, {quoted:m}); }
        else { delete global.db.antimarabou[jid]; return await sock.sendMessage(jid, {text:"❌ AntiMarabou OFF"}, {quoted:m}); }
      }

      if(cmd === "responder"){
        global.db.responder[jid]=txt;
        return await sock.sendMessage(jid, {text:"✅ Auto Responder: "+txt}, {quoted:m});
      }

      if(cmd === "on"){
        global.db.active=true;
        return await sock.sendMessage(jid, {text:"✅ CHOCO-LÉGENDE V3 ACTIF 😈🔥"}, {quoted:m});
      }

      if(cmd === "off"){
        global.db.active=false;
        return await sock.sendMessage(jid, {text:"❌ Bot OFF"}, {quoted:m});
      }

      if(cmd === "add"){
        if(!txt) return await sock.sendMessage(jid, {text:"Ex:.add 224611257942"}, {quoted:m});
        const num=txt.replace(/[^0-9]/g,"")+"@s.whatsapp.net";
        try{
          await sock.groupParticipantsUpdate(jid, [num], "add");
          return await sock.sendMessage(jid, {text:"✅ Ajouté"}, {quoted:m});
        } catch(e){
          return await sock.sendMessage(jid, {text:"❌ Erreur: Bot pas admin"}, {quoted:m});
        }
      }

      // MENU PRINCIPAL
      const up=process.uptime();
      const h=Math.floor(up/3600), mn=Math.floor((up%3600)/60);
      return await sock.sendMessage(jid, {text:`*😈 CHOCO-LÉGENDE V3 😈*\n\n⏰ Uptime: ${h}h ${mn}m\n👑 Owner: 224611257942\n\n*COMMANDES:*\n.vv1 (réponds à vue unique)\n.vv2\n.antistatut on/off\n.antimarabou on/off\n.responder [text]\n.on /.off\n.add [num]\n\n🔥 300 commandes actives!`}, {quoted:m});

    } catch(e) {
      console.log("Erreur menu:", e.message);
      await sock.sendMessage(m.key.remoteJid, {text: "❌ Erreur: "+e.message}, {quoted: m});
    }
  }
}