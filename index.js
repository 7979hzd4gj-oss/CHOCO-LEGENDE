import 'dotenv/config';
import fs, { existsSync, mkdirSync, rmSync } from 'fs';
import path, { dirname } from 'path';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { parsePhoneNumber as PhoneNumber } from 'awesome-phonenumber';
import readline from 'readline';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { smsg } from './lib/myfunc.js';
import { compileAll } from './lib/compile.js';
import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers, jidDecode, jidNormalizedUser, makeCacheableSignalKeyStore, delay } from '@whiskeysockets/baileys';
import NodeCache from 'node-cache';
import pino from 'pino';
import config from './config.js';
import store from './lib/lightweight_store.js';
import SaveCreds from './lib/session.js';
import { server, PORT } from './lib/server.js';
import { printLog } from './lib/print.js';
import { writeErrorLog } from './lib/logger.js';
import { handleMessages, handleGroupParticipantUpdate, handleStatus, handleCall } from './lib/messageHandler.js';
import commandHandler from './lib/commandHandler.js';

store.readFromFile();
setInterval(() => store.writeToFile(), config.storeWriteInterval || 10000);

const phoneNumber = config.pairingNumber || config.ownerNumber || "224611257942";

const DATA_DEFAULTS = {
    'owner.json': ["224611257942"],
    'banned.json': [],
    'premium.json': [],
    'warnings.json': {},
    'notes.json': {},
    'autoAi.json': {},
    'messageCount.json': { isPublic: true, messageCount: {} },
    'userGroupData.json': { users: [], groups: [], antilink: {}, antibadword: {}, warnings: {}, sudo: [], welcome: {}, goodbye: {}, chatbot: {}, autoReaction: false },
    'autoStatus.json': { enabled: false },
    'autoread.json': { enabled: false },
    'autotyping.json': { enabled: false },
    'pmblocker.json': { enabled: false },
    'anticall.json': { enabled: false },
    'stealthMode.json': { enabled: false },
    'autoBio.json': { enabled: false, customBio: null },
    'autoReaction.json': { enabled: false },
    'antidelete.json': { enabled: false },
    'antilink.json': {},
    'antibadword.json': {},
};
fs.mkdirSync('./data', { recursive: true });
for (const [file, def] of Object.entries(DATA_DEFAULTS)) {
    const fp = `./data/${file}`;
    if (!fs.existsSync(fp)) fs.writeFileSync(fp, JSON.stringify(def, null, 2));
}

global.botname = config.botName || "CHOCO LÉGENDE 😈";
global.themeemoji = "😈";
const pairingCode =!process.argv.includes("--qr-code");
const useMobile = process.argv.includes("--mobile");
let rl = null; let rlClosed = false;
if (process.stdin.isTTY &&!config.pairingNumber) {
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.on('close', () => { rlClosed = true; });
}
const question = (text) => {
    if (rl &&!rlClosed) { return new Promise((resolve) => rl.question(text, resolve)); }
    else { return Promise.resolve(config.ownerNumber || phoneNumber); }
};

function ensureSessionDirectory() {
    const sessionPath = path.join(__dirname, 'session');
    if (!existsSync(sessionPath)) { mkdirSync(sessionPath, { recursive: true }); }
    return sessionPath;
}
function hasValidSession() {
    try {
        const credsPath = path.join(__dirname, 'session', 'creds.json');
        if (!existsSync(credsPath)) return false;
        const fileContent = fs.readFileSync(credsPath, 'utf8');
        if (!fileContent || fileContent.trim().length === 0) return false;
        const creds = JSON.parse(fileContent);
        if (!creds.noiseKey ||!creds.signedIdentityKey ||!creds.signedPreKey) return false;
        if (creds.registered === false) { try { rmSync(path.join(__dirname, 'session'), { recursive: true, force: true }); } catch (_e) {} return false; }
        printLog('success', 'Valid session CHOCO LEGENDE found 😈');
        return true;
    } catch (error) { return false; }
}
async function initializeSession() {
    ensureSessionDirectory();
    const txt = config.sessionId;
    if (!txt) { if (hasValidSession()) return true; return false; }
    if (hasValidSession()) return true;
    try { await SaveCreds(txt); await delay(2000); return hasValidSession(); } catch (error) { return false; }
}

server.listen(PORT, () => { printLog('success', `CHOCO LEGENDE Server on port ${PORT} 😈`); });

async function startChocoLegende() {
    try {
        const { version } = await fetchLatestBaileysVersion();
        ensureSessionDirectory(); await delay(1000);
        const { state, saveCreds } = await useMultiFileAuthState(`./session`);
        const _saveCreds = async () => { ensureSessionDirectory(); await saveCreds(); };
        const msgRetryCounterCache = new NodeCache();
        const QasimDev = makeWASocket({
            version, logger: pino({ level: 'silent' }), browser: Browsers.macOS('Chrome'),
            auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })) },
            markOnlineOnConnect: true, generateHighQualityLinkPreview: true, syncFullHistory: false,
            getMessage: async (key) => { const jid = jidNormalizedUser(key.remoteJid); const msg = await store.loadMessage(jid, key.id); return msg?.message || ""; },
            msgRetryCounterCache, defaultQueryTimeoutMs: 60000, connectTimeoutMs: 60000, keepAliveIntervalMs: 10000,
        });
        QasimDev.store = store;
        QasimDev.ev.on('creds.update', _saveCreds); store.bind(QasimDev.ev);
        QasimDev.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0]; if (!mek.message) return;
                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')? mek.message.ephemeralMessage.message : mek.message;
                if (mek.key && mek.key.remoteJid === 'status@broadcast') { await handleStatus(QasimDev, chatUpdate); return; }
                if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
                await handleMessages(QasimDev, chatUpdate);
            } catch (err) { printLog('error', `Error: ${err.message}`); }
        });
        QasimDev.decodeJid = (jid) => { if (!jid) return jid; if (/:\d+@/gi.test(jid)) { const decode = jidDecode(jid) || {}; return decode.user && decode.server && `${decode.user }@${ decode.server}` || jid; } else return jid; };
        QasimDev.getName = (jid) => { const id = QasimDev.decodeJid(jid); return PhoneNumber(`+${ jid.replace('@s.whatsapp.net', '')}`).number?.international || id; };
        QasimDev.public = true; QasimDev.serializeM = (m) => smsg(QasimDev, m, store);
        const isRegistered = state.creds?.registered === true;
        if (pairingCode &&!isRegistered) {
            let phoneNumberInput = config.pairingNumber || "224611257942";
            phoneNumberInput = phoneNumberInput.replace(/[^0-9]/g, '');
            setTimeout(async () => {
                try { let code = await QasimDev.requestPairingCode(phoneNumberInput); code = code?.match(/.{1,4}/g)?.join("-") || code; console.log(chalk.bgGreen.black(`TON CODE PAIRING CHOCO: ${code} 😈`)); } catch(e){ printLog('error', e.message); }
            }, 3000);
        }
        QasimDev.ev.on('connection.update', async (s) => {
            const { connection, lastDisconnect, qr } = s;
            if (qr &&!pairingCode) { try { console.log(await QRCode.toString(qr, { type: 'terminal', small: true })); } catch (_e) { console.log('QR:', qr); } }
            if (connection === "open") {
                printLog('success', 'CHOCO LÉGENDE CONNECTÉ 😈!');
                printLog('info', `Bot: ${config.botName}`); printLog('info', `Owner: ${config.ownerNumber}`); printLog('info', `Prefix: ${config.prefix}`);
                try { await QasimDev.sendMessage(`${config.ownerNumber}@s.whatsapp.net`, { text: `*${config.botName} V3 😈 EN LIGNE!*\n\n👑 Owner: ${config.ownerNumber}\n😈 Préfixe: ${config.prefix}\n\nTape *${config.prefix}menu* pour commencer!` }); } catch(e){}
            }
            if (connection === 'close') {
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                if (statusCode!== DisconnectReason.loggedOut) { await delay(5000); startChocoLegende(); }
            }
        });
        QasimDev.ev.on('call', async (calls) => { await handleCall(QasimDev, calls); });
        QasimDev.ev.on('group-participants.update', async (update) => { await handleGroupParticipantUpdate(QasimDev, update); });
        return QasimDev;
    } catch (error) { printLog('error', error.message); await delay(5000); startChocoLegende(); }
}
async function main() {
    await compileAll(); await commandHandler.loadCommands();
    printLog('info', 'Démarrage CHOCO LÉGENDE V3 😈...'); await initializeSession(); await delay(3000); startChocoLegende();
}
main();