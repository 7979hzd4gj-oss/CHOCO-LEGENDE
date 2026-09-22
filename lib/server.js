import express from 'express'
export const PORT = process.env.PORT || 10000
export const server = express()
server.get('/', (req, res) => res.send('CHOCO LEGENDE V3 LIVE 😈'))