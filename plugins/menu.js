export default {
name: "menu",
alias: ["vv1","vv2","antistatut","antimarabou","responder","on","off","add","help","300"],
desc: "Menu 300 tout en 1",
async execute(sock, m, args, config) {
const body = (m.message.conversation||m.message.extendedTextMessage?.text||"").toLowerCase();
const cmd = body.slice(1).trim().split(/ +/)[0];
const up = process.uptime();
const h = Math.floor(up/3600), mn = Math.floor((up%3600)/60);

if(cmd==="vv1"){
return await sock.sendMessage(m.key.remoteJid,{text:"*😈 CHOCO V1 - 300 CMDS*\n\n.antistatut\n.antimarabou\n.responder\n.on.add\n\n.menu pour tout\n224611257942"});
}
if(cmd==="vv2"){
return await sock.sendMessage(m.key.remoteJid,{text:"*😈 CHOCO V2 PREMIUM 300* 😈\n🇬🇳 BOT GUINÉEN\n👑 224611257942\n⚡ 300 CMDS\n\n🔥 antistatut\n🔥 antimarabou\n🔥 responder / on / add\n\n.menu"});
}
if(cmd==="antistatut"){
return await sock.sendMessage(m.key.remoteJid,{text:`🛡️ *ANTISTATUT* 😈\nEtat: ${args[0]||"on/off"}\nUsage: ${config.prefix}antistatut on`});
}
if(cmd==="antimarabou"){
return await sock.sendMessage(m.key.remoteJid,{text:`🛡️ *ANTIMARABOU* 😈\nBloque marabout!\n${config.prefix}antimarabou on/off`});
}
if(cmd==="responder"){
return await sock.sendMessage(m.key.remoteJid,{text:`🤖 *RESPONDER*\n${config.prefix}add mot | reponse\n${config.prefix}on responder`});
}
if(cmd==="on"){
return await sock.sendMessage(m.key.remoteJid,{text:`✅ *${args[0]||"fonction"}* activé! 😈`});
}
if(cmd==="off"){
return await sock.sendMessage(m.key.remoteJid,{text:`❌ *${args[0]||"fonction"}* désactivé! 😈`});
}
if(cmd==="add"){
return await sock.sendMessage(m.key.remoteJid,{text:`➕ *ADD*\n${config.prefix}add 2246xxxxxxx`});
}

const txt = `
╔═〔 😈CHOCO 300 〕═❒
║ 224611257942 | ${h}h ${mn}m
╚══════════❒
GENERAL:.menu.vv1 ⭐.vv2 ⭐.ping
ADMIN:.open.close.ban.kick.add ⭐
PROTECTION:.antilink.antistatut ⭐.antimarabou ⭐
RESPONDER:.responder ⭐.on ⭐.off
OWNER:.self.mode.restart
EDITING:.sticker.toimage.remini
AI:.ai.gpt.imagine
DOWN:.play.video.apk.tiktok
TEXT:.neon.glitch.fire

😈 300 CMDS - CHOCO LEGENDE
Tape.vv1.vv2.antistatut.antimarabou
`;
await sock.sendMessage(m.key.remoteJid,{text: txt});
}
}