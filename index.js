import makeWASocket,{useMultiFileAuthState,DisconnectReason,fetchLatestBaileysVersion} from "@whiskeysockets/baileys";
import P from "pino";
import config from "./config.js";
import {loadCommands} from "./lib/commandLoader.js";
import {textOf} from "./lib/helpers.js";

async function startBot(){
 const commands=await loadCommands();
 const {state,saveCreds}=await useMultiFileAuthState("./auth_info");
 const {version}=await fetchLatestBaileysVersion();
 const sock=makeWASocket({version,auth:state,logger:P({level:"silent"}),browser:[config.botName,"Chrome","1.0.0"]});
 sock.ev.on("creds.update",saveCreds);
 sock.ev.on("connection.update",({connection,lastDisconnect})=>{
  if(connection==="open") console.log(`✅ ${config.botName} est connecté !`);
  if(connection==="close"){
   const code=lastDisconnect?.error?.output?.statusCode;
   if(code!==DisconnectReason.loggedOut) setTimeout(startBot,3000);
   else console.log("❌ Session déconnectée.");
  }
 });
 sock.ev.on("messages.upsert",async({messages})=>{
  const m=messages?.[0]; if(!m?.message||m.key.fromMe)return;
  try{
   const body=textOf(m).trim(); if(!body.startsWith(config.prefix))return;
   const p=body.slice(config.prefix.length).trim().split(/\s+/), name=(p.shift()||"").toLowerCase();
   const cmd=commands.get(name); if(!cmd)return;
   await cmd.execute(sock,m,p,config);
  }catch(e){console.error(e); await sock.sendMessage(m.key.remoteJid,{text:"❌ Erreur de commande."});}
 });
}
startBot().catch(console.error);
