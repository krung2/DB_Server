FROM node:12
WORKDIR /usr/src/DB

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]