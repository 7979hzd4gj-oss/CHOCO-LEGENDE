import 'dotenv/config';

const _prefixes = process.env.PREFIXES ? process.env.PREFIXES.split(',') : ['.', '😈', '!'];

const config = {
  botName: process.env.BOT_NAME || 'CHOCO-LÉGENDE V3',
  botOwner: process.env.BOT_OWNER || 'CHOCO-LEGENDE',
  ownerNumber: process.env.OWNER_NUMBER || '224611257942',
  author: process.env.AUTHOR || 'CHOCO-LEGENDE',
  packname: process.env.PACKNAME || 'CHOCO-LÉGENDE V3',
  description: process.env.DESCRIPTION || 'CHOCO-LÉGENDE V3',
  version: '3.0.0',
  prefixes: _prefixes,
  prefix: '😈',
  commandMode: process.env.COMMAND_MODE || 'public',
  timeZone: process.env.TIMEZONE || 'Africa/Conakry',
  channelLink: process.env.CHANNEL_LINK || '',
  updateZipUrl: process.env.UPDATE_URL || '',
  ytChannel: process.env.YT_CHANNEL || '',
  sessionId: process.env.SESSION_ID || '',
  pairingNumber: process.env.PAIRING_NUMBER || '224611257942',
  port: Number(process.env.PORT) || 5000,
  maxStoreMessages: Number(process.env.MAX_STORE) || 100,
  tempCleanupInterval: Number(process.env.TEMP_CLEAN) || 3600000,
  storeWriteInterval: Number(process.env.STORE_WRITE) || 10000,
  giphyApiKey: process.env.GIPHY_API_KEY || '',
  removeBgKey: process.env.REMOVEBG_KEY || '',
  botImage: 'https://i.imgur.com/ton-image.jpg',
  menuImage: 'https://i.imgur.com/ton-image.jpg'
};

export default config;