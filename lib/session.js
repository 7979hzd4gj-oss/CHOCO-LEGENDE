import fs from 'fs'
export default async function SaveCreds(sessionId) {
  try {
    if (!sessionId) return
    let data = sessionId
    if (data.startsWith('CHOCO~')) data = data.replace('CHOCO~','')
    try {
      const decoded = Buffer.from(data, 'base64').toString('utf-8')
      if (decoded.includes('creds')) {
        const creds = JSON.parse(decoded)
        fs.mkdirSync('./session', {recursive:true})
        fs.writeFileSync('./session/creds.json', JSON.stringify(creds, null, 2))
        return
      }
    } catch {}
    if (data.trim().startsWith('{')) {
      fs.mkdirSync('./session', {recursive:true})
      fs.writeFileSync('./session/creds.json', data)
    }
  } catch (e) { console.log(e.message) }
}