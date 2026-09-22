export default {
  name: "menu",
  alias: ["allmenu", "help"],
  desc: "Menu CHOCO BOT",
  category: "GENERAL",

  async execute(sock, m, args, config) {
    const up = process.uptime();
    const h = Math.floor(up / 3600);
    const mn = Math.floor((up % 3600) / 60);

    const txt = `
╔════════════════════════════╗
║   😈 CHOCO-LEGENDE-V3 😈   ║
╠════════════════════════════╣
║ 🇬🇳  CHOCO BOT — 300 CMDS  ║
║ 👑 Owner: 224611257942      ║
║ ⏱️ Uptime: ${h}h ${mn}m
╚════════════════════════════╝

╔══════〔 GENERAL 〕══════╗
║ .menu
║ .help
║ .ping
║ .alive
║ .uptime
║ .owner
║ .info
║ .botinfo
║ .contact
║ .repo
║ .github
║ .sc
║ .test
║ .id
║ .gjid
║ .url
║ .linkwa
║ .groupinfo
║ .staff
║ .weather
║ .news
║ .fact
║ .quote
║ .joke
║ .8ball
║ .lyrics
║ .trt
║ .ss
║ .attp
╚═══════════════════════╝

╔══════〔 ADMIN 〕══════╗
║ .open
║ .close
║ .ban
║ .kick
║ .warn
║ .promote
║ .demote
║ .mute
║ .unmute
║ .delete
║ .clear
║ .tagall
║ .tag
║ .hidetag
║ .add
║ .remove
║ .setgname
║ .setgpp
║ .kickall
║ .purge
║ .approve
║ .invite
║ .grouplink
║ .revoke
║ .totalmembers
║ .sanction
║ .signal
║ .autorecording
║ .antidemote
║ .gstatus
║ .link
║ .welcome
║ .goodbye
║ .setwelcome
║ .setgoodbye
╚═══════════════════════╝

╔════〔 PROTECTION ⭐ 〕════╗
║ .antilink
║ .antibadword
║ .antibot
║ .antileave
║ .antimention
║ .antisticker
║ .antitag
║ .anticall
║ .antidelete
║ .antipurge
║ .antimarabou
║ .antistatut
║ .antifake
║ .antispam
║ .antiviewonce
║ .antigroup
║ .antivoice
║ .antifile
║ .antishare
║ .antiflood
║ .antiedit
║ .antichannel
╚════════════════════════╝

╔══════〔 GROUP 〕══════╗
║ .group
║ .setdesc
║ .setsubject
║ .setgname
║ .setgpp
║ .getgpp
║ .getdesc
║ .getsubject
║ .admins
║ .members
║ .list
║ .mention
║ .everyone
║ .tagall
║ .hidetag
║ .add
║ .remove
║ .kick
║ .promote
║ .demote
║ .warn
║ .warnings
║ .resetwarn
║ .welcome
║ .goodbye
║ .setwelcome
║ .setgoodbye
║ .poll
║ .announce
╚═══════════════════════╝

╔══════〔 DOWNLOAD 〕══════╗
║ .play
║ .song
║ .video
║ .ytmp3
║ .ytmp4
║ .youtube
║ .tiktok
║ .tiktokdl
║ .instagram
║ .igdl
║ .facebook
║ .fb
║ .twitter
║ .xdl
║ .mediafire
║ .gdrive
║ .apk
║ .image
║ .pinterest
║ .pin
║ .spotify
║ .spotifydl
║ .soundcloud
║ .scloud
╚════════════════════════╝

╔══════〔 FUN 😂 〕══════╗
║ .meme
║ .gif
║ .sticker
║ .s
║ .take
║ .emojimix
║ .ship
║ .love
║ .rate
║ .simp
║ .gay
║ .horny
║ .dare
║ .truth
║ .truthdare
║ .wouldyou
║ .riddle
║ .quiz
║ .guess
║ .tictactoe
║ .roll
║ .coin
║ .dice
║ .slot
╚══════════════════════╝

╔══════〔 STICKER 〕══════╗
║ .sticker
║ .s
║ .stiker
║ .toimg
║ .toimage
║ .take
║ .steal
║ .wm
║ .circle
║ .crop
║ .blur
║ .removebg
║ .qc
║ .emojimix
║ .attp
╚══════════════════════╝

╔══════〔 SEARCH 🔎 〕══════╗
║ .google
║ .search
║ .ytsearch
║ .yts
║ .image
║ .img
║ .wiki
║ .wikipedia
║ .news
║ .weather
║ .define
║ .translate
║ .lyrics
║ .movie
║ .anime
║ .manga
╚═══════════════════════╝

╔══════〔 IA 🤖 〕══════╗
║ .ai
║ .gpt
║ .chat
║ .ask
║ .gemini
║ .copilot
║ .imagine
║ .imageai
║ .translate
║ .summarize
║ .rewrite
║ .code
║ .explain
║ .question
╚══════════════════════╝

╔══════〔 OWNER 👑 〕══════╗
║ .eval
║ .exec
║ .shell
║ .restart
║ .shutdown
║ .update
║ .setprefix
║ .prefix
║ .broadcast
║ .bc
║ .join
║ .leave
║ .block
║ .unblock
║ .setbio
║ .setname
║ .setpp
║ .setstatus
║ .listban
║ .listgroup
║ .clearsession
╚═══════════════════════╝

╔══════〔 UTILITIES 🛠️ 〕══════╗
║ .calc
║ .time
║ .date
║ .qr
║ .readqr
║ .short
║ .shorturl
║ .url
║ .fetch
║ .get
║ .upload
║ .tourl
║ .base64
║ .encode
║ .decode
║ .hash
║ .screenshot
╚══════════════════════════╝

╔════════════════════════════╗
║ 😈 CHOCO-LEGENDE-V3 😈     ║
║ 🇬🇳 CHOCO BOT 🇬🇳           ║
║ 👑 224611257942             ║
║ ⚡ 300 COMMANDES            ║
╚════════════════════════════╝
`;

    await sock.sendMessage(m.key.remoteJid, {
      text: txt
    });
  }
};