FROM node:20-alpine

WORKDIR /app

# Dépendances système pour sharp et better-sqlite3
RUN apk add --no-cache python3 make g++ vips-dev

COPY package*.json ./

RUN npm install --no-audit --no-fund

COPY . .

# Ne PAS recréer plugins s'il existe déjà!
RUN mkdir -p /app/plugins /app/data /app/session

EXPOSE 5000

CMD ["npm", "start"]