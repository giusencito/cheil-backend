FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
RUN npx prisma generate
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]