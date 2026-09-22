export default {
  name: "menu",
  alias: ["vv1","vv2","antistatut","antimarabou","responder","on","off","add"],
  desc: "Menu 300 tout en 1",
  async execute(sock, m, args, config) {
    const body = (m.message?.conversation || m.message?.extendedTextMessage?.text || "");
    const cmd = body.slice(1).trim().split(/ +/)[0].toLowerCase();
    const txt = body.slice(1).trim().split(/ +/).slice(1).join(" ");
    const jid = m.key.remoteJid;

    if (!global.db) global.db = {};
    if (!global.db.antistatut) global.db.antistatut = {};
    if (!global.db.antimarabou) global.db.antimarabou = {};
    if (!global.db.responder) global.db.responder = {};

    if(cmd==="vv1"){
      const q = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if(!q) return await sock.sendMessage(jid, {text:"Réponds à une vue unique!"}, {quoted: m});
      const view = q.viewOnceMessageV2?.message || q.viewOnceMessage?.message;
      if(!view) return await sock.sendMessage(jid, {text:"Pas une vue unique"}, {quoted: m});
      const type = Object.keys(view)[0];
      const buf = await sock.downloadMediaMessage({message: view});
      return await sock.sendMessage(jid, {[type.replace("Message","").toLowerCase()]: buf}, {quoted: m});
    }

    if(cmd==="vv2"){
      const q = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if(!q) return await sock.sendMessage(jid, {text:"Réponds à vv2!"}, {quoted: m});
      const view = q.viewOnceMessageV2Extension?.message;
      if(!view) return await sock.sendMessage(jid, {text:"Pas vv2"}, {quoted: m});
      const type = Object.keys(view)[0];
      const buf = await sock.downloadMediaMessage({message: view});
      return await sock.sendMessage(jid, {[type.replace("Message","").toLowerCase()]: buf}, {quoted: m});
    }

    if(cmd==="antistatut"){
      if(txt==="on"){ global.db.antistatut[jid]=true; return await sock.sendMessage(jid, {text:"✅ AntiStatut ON"}, {quoted:m}); }
      else { delete global.db.antistatut[jid]; return await sock.sendMessage(jid, {text:"❌ AntiStatut OFF"}, {quoted:m}); }
    }

    if(cmd==="antimarabou"){
      if(txt==="on"){ global.db.antimarabou[jid]=true; return await sock.sendMessage(jid, {text:"✅ AntiMarabou ON"}, {quoted:m}); }
      else { delete global.db.antimarabou[jid]; return await sock.sendMessage(jid, {text:"❌ AntiMarabou OFF"}, {quoted:m}); }
    }

    if(cmd==="responder"){
      global.db.responder[jid]=txt;
      return await sock.sendMessage(jid, {text:"✅ Responder: "+txt}, {quoted:m});
    }

    if(cmd==="on"){
      global.db.active=true;
      return await sock.sendMessage(jid, {text:"✅ CHOCO-LÉGENDE V3 ACTIF 😈"}, {quoted:m});
    }

    if(cmd==="off"){
      global.db.active=false;
      return await sock.sendMessage(jid, {text:"❌ Bot OFF"}, {quoted:m});
    }

    if(cmd==="add"){
      if(!txt) return await sock.sendMessage(jid, {text:"Ex:.add 224611257942"}, {quoted:m});
      const num=txt.replace(/[^0-9]/g,"")+"@s.whatsapp.net";
      try{ await sock.groupParticipantsUpdate(jid, [num], "add"); return await sock.sendMessage(jid, {text:"✅ Ajouté"}, {quoted:m}); } catch{ return await sock.sendMessage(jid, {text:"Erreur admin requis"}, {quoted:m}); }
    }

    const up=process.uptime();
    const h=Math.floor(up/3600), mn=Math.floor((up%3600)/60);
    return await sock.sendMessage(jid, {text:`*CHOCO V3*\n${h}h ${mn}m\n\n.vv1\n.vv2\n.antistatut on/off\n.antimarabou on/off\n.responder\n.on\n.add`}, {quoted:m});
  }
}