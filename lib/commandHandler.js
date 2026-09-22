import fs from 'fs'
import path from 'path'
class Handler {
  constructor() { this.commands = new Map() }
  async loadCommands() {
    try {
      const p = './plugins'
      if (!fs.existsSync(p)) return 0
      const files = fs.readdirSync(p).filter(f => f.endsWith('.js'))
      for (const file of files) {
        try {
          const mod = await import(`../plugins/${file}`)
          const cmd = mod.default || mod
          if (cmd?.name) this.commands.set(cmd.name, cmd)
        } catch {}
      }
      return this.commands.size
    } catch { return 0 }
  }
}
export default new Handler()