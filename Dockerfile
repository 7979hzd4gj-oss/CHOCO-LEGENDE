FROM node:20

WORKDIR /root/CHOCO-LEGENDE

COPY package*.json ./

RUN npm install --force

COPY . .

RUN mkdir -p plugins

EXPOSE 5000

CMD ["npm", "start"]