export default {
name: "menu",
alias: ["allmenu","help"],
desc: "Menu 300",
category: "GENERAL",
async execute(sock, m, args, config) {
const up = process.uptime();
const h = Math.floor(up/3600);
const mn = Math.floor((up%3600)/60);
const txt = `
╔═〔 😈𝗖𝗛𝗢𝗖𝗢-𝗟𝗘𝗚𝗘𝗡𝗗𝗘-𝗩3 〕═❒
║ 🇬🇳 300 COMMANDES CHOCO 🇬🇳
║ Owner: 224611257942 | ${h}h ${mn}m
╚══════════════════❒

╔══ GENERAL (35) ══
║ .menu .vv1 .vv2 .ping .alive .uptime
║ .owner .joke .quote .fact .weather .news
║ .attp .lyrics .8ball .groupinfo .staff .trt
║ .ss .gjid .url .test .info .contact .loi
║ .clan .id .linkwa .git .github .sc .repo
╚══════════════════❒
╔══ ADMIN (40) ══
║ .open .close .ban .kick .warn .promote
║ .demote .mute .unmute .delete .clear .tagall
║ .tag .hidetag .add .remove .setgname .setgpp
║ .kickall .purge .approve .invite .grouplink
║ .revoke .totalmembers .sanction .signal
║ .autorecording .antidemote .gstatus .link
║ .welcome .goodbye .setwelcome .setgoodbye
╚══════════════════❒
╔══ PROTECTION (30) ⭐
║ .antilink .antibadword .antibot .antileave
║ .antimention .antisticker .antitag .anticall
║ .antidelete .antipurge .antimarabou
║ .antistatut .antifake .antispam .antiviewonce
║ .antigroup .antivoice .antifile .antishare
╚══════════════════❒
😈 300 CMDS - CHOCO 224611257942 - V3 PRO 😈
`;
await sock.sendMessage(m.key.remoteJid, {text: txt});
}
}