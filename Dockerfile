FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++ vips-dev
COPY package*.json ./RUN npm install --legacy-peer-deps --force
COPY . .
RUN mkdir -p data session
EXPOSE 5000
CMD ["npm", "start"]