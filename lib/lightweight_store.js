import fs from 'fs'
let storeData = { contacts: {}, messages: {} }
const store = {
  readFromFile() {
    try { if(fs.existsSync('./data/store.json')) storeData = JSON.parse(fs.readFileSync('./data/store.json')) } catch {}
  },
  writeToFile() {
    try { fs.writeFileSync('./data/store.json', JSON.stringify(storeData)) } catch {}
  },
  bind(ev) {},
  async loadMessage(jid, id) { return null },
  contacts: {}
}
export default store