import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';
import NodeCache from 'node-cache';
import pino from 'pino';
import QRCode from 'qrcode';
import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers, jidDecode, jidNormalizedUser, makeCacheableSignalKeyStore, delay } from '@whiskeysockets/baileys';

import config from './config.js';
import { smsg } from './lib/myfunc.js';
import { compileAll } from './lib/compile.js';
import store from './lib/lightweight_store.js';
import SaveCreds from './lib/session.js';
import { server, PORT } from './lib/server.js';
import { printLog } from './lib/print.js';
import commandHandler from './lib/commandHandler.js';
import { handleMessages, handleGroupParticipantUpdate, handleStatus, handleCall } from './lib/messageHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===== CONFIG =====
global.botname = config.botName;
global.themeemoji = config.themeEmoji || "😈";
const pairingCode =!process.argv.includes("--qr-code");

// ===== DATA FOLDERS =====
const DATA_DEFAULTS = {
    'owner.json': [config.ownerNumber],
    'banned.json': [],
    'premium.json': [],
};
fs.mkdirSync('./data', { recursive: true });
fs.mkdirSync('./session', { recursive: true });
for (const [file, def] of Object.entries(DATA_DEFAULTS)) {
    const fp = `./data/${file}`;
    if (!fs.existsSync(fp)) fs.writeFileSync(fp, JSON.stringify(def, null, 2));
}

// ===== STORE =====
store.readFromFile();
setInterval(() => store.writeToFile(), 10000);

// ===== SESSION =====
function hasValidSession() {
    try {
        const creds = JSON.parse(fs.readFileSync('./session/creds.json', 'utf8'));
        return!!creds.noiseKey && creds.registered!== false;
    } catch { return false; }
}

async function initSession() {
    if (hasValidSession()) return true;
    if (!config.sessionId) return false;
    try {
        await SaveCreds(config.sessionId);
        await delay(2000);
        return hasValidSession();
    } catch { return false; }
}

// ===== SERVER =====
server.listen(PORT, () => printLog('success', `Serveur CHOCO sur ${PORT} 😈`));

// ===== BOT START =====
async function startBot() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' }))
        },
        markOnlineOnConnect: true,
        getMessage: async (key) => {
            const msg = await store.loadMessage(jidNormalizedUser(key.remoteJid), key.id);
            return msg?.message || "";
        },
        msgRetryCounterCache: new NodeCache(),
    });

    sock.store = store;
    sock.ev.on('creds.update', saveCreds);
    store.bind(sock.ev);

    // Messages
    sock.ev.on('messages.upsert', async (chatUpdate) => {
        const mek = chatUpdate.messages[0];
        if (!mek?.message) return;
        mek.message = mek.message.ephemeralMessage?.message || mek.message;
        if (mek.key.remoteJid === 'status@broadcast') return handleStatus(sock, chatUpdate);
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
        await handleMessages(sock, chatUpdate);
    });

    sock.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const d = jidDecode(jid) || {};
            return d.user && d.server? `${d.user}@${d.server}` : jid;
        }
        return jid;
    };

    sock.public = true;
    sock.serializeM = (m) => smsg(sock, m, store);

    // Pairing
    if (pairingCode &&!state.creds.registered) {
        setTimeout(async () => {
            const num = (config.pairingNumber || config.ownerNumber).replace(/[^0-9]/g, '');
            try {
                let code = await sock.requestPairingCode(num);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(chalk.bgGreen.black(`\n CODE PAIRING: ${code} 😈 \n`));
            } catch (e) { printLog('error', e.message); }
        }, 3000);
    }

    // Connection
    sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
        if (qr &&!pairingCode) console.log(await QRCode.toString(qr, { type: 'terminal', small: true }));

        if (connection === "open") {
            const total = commandHandler.commands?.size || 0;
            printLog('success', `CHOCO V3 CONNECTÉ! ${total} COMMANDES 😈`);
            printLog('info', `Bot: ${config.botName} | Owner: ${config.ownerNumber} | Prefix: ${config.prefix}`);
        }

        if (connection === "close" && lastDisconnect?.error?.output?.statusCode!== DisconnectReason.loggedOut) {
            await delay(5000);
            startBot();
        }
    });

    sock.ev.on('call', (c) => handleCall(sock, c));
    sock.ev.on('group-participants.update', (u) => handleGroupParticipantUpdate(sock, u));
}

async function main() {
    await compileAll();
    const count = await commandHandler.loadCommands();
    printLog('info', `✅ ${count} plugins chargés depuis /plugins`);
    printLog('info', `Démarrage ${config.botName}...`);
    await initSession();
    await delay(2000);
    startBot();
}

main();