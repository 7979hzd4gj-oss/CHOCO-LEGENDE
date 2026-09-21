import 'dotenv/config';
const _prefixes = process.env.PREFIXES ? process.env.PREFIXES.split(',') : ['😈'];
const config = {
    // Bot Identity - CHOCO LÉGENDE V3
    botName: process.env.BOT_NAME || 'CHOCO LÉGENDE',
    botOwner: process.env.BOT_OWNER || 'CHOCO LÉGENDE',
    ownerNumber: process.env.OWNER_NUMBER || '224611257942',
    author: process.env.AUTHOR || 'CHOCO LÉGENDE 😈',
    packname: process.env.PACKNAME || 'CHOCO LÉGENDE',
    description: process.env.DESCRIPTION || 'CHOCO LÉGENDE V3 - Bot WhatsApp Démoniaque Haute Performance',
    version: '3.0.0',
    // Bot Config
    prefixes: _prefixes,
    prefix: '😈',
    commandMode: process.env.COMMAND_MODE || 'public',
    timeZone: process.env.TIMEZONE || 'Africa/Conakry',
    // Links - À TOI
    channelLink: process.env.CHANNEL_LINK || '',
    updateZipUrl: process.env.UPDATE_URL || '',
    ytChannel: process.env.YT_CHANNEL || 'CHOCO LÉGENDE',
    // Session
    sessionId: process.env.SESSION_ID || '',
    pairingNumber: process.env.PAIRING_NUMBER || '',
    // Performance
    port: Number(process.env.PORT) || 5000,
    maxStoreMessages: Number(process.env.MAX_STORE_MESSAGES) || 20,
    tempCleanupInterval: Number(process.env.CLEANUP_INTERVAL) || 1 * 60 * 60 * 1000,
    storeWriteInterval: Number(process.env.STORE_WRITE_INTERVAL) || 10000,
    // API Keys
    giphyApiKey: process.env.GIPHY_API_KEY || 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
    removeBgKey: process.env.REMOVEBG_KEY || '',
    // Warn system
    warnCount: 3,
    // External APIs
    APIs: {
        xteam: 'https://api.xteam.xyz',
        dzx: 'https://api.dhamzxploit.my.id',
        lol: 'https://api.lolhuman.xyz',
        violetics: 'https://violetics.pw',
        neoxr: 'https://api.neoxr.my.id',
        zenzapis: 'https://zenzapis.xyz',
        akuari: 'https://api.akuari.my.id',
        akuari2: 'https://apimu.my.id',
        nrtm: 'https://fg-nrtm.ddns.net',
        fgmods: 'https://api-fgmods.ddns.net'
    },
    APIKeys: {
        'https://api.xteam.xyz': 'd90a9e986e18778b',
        'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
        'https://api.neoxr.my.id': process.env.NEOXR_KEY || 'yourkey',
        'https://violetics.pw': 'beta',
        'https://zenzapis.xyz': process.env.ZENZAPIS_KEY || 'yourkey',
        'https://api-fgmods.ddns.net': 'fg-dylux'
    }
};
export default config;