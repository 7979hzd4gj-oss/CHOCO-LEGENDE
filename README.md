# CHOCO-LEGENDE-V3 — Full Command Project

Projet WhatsApp basé sur Baileys.

## Installation
```bash
npm install
npm start
```

## Protection
Les commandes de protection disposent maintenant d'un vrai système de réglages persistants dans `database/protection.json`.
Exemple dans un groupe:
`.antilink`
`.antilink on`
`.antilink off`

## Important
Certaines commandes externes (YouTube, TikTok, Spotify, IA, météo, etc.) nécessitent une API ou un service externe et ne peuvent pas être rendues universelles sans leurs accès. Les commandes sensibles d'exécution arbitraire ne sont pas transformées en RCE libre.

Ne publie jamais `auth_info` contenant une session WhatsApp.
