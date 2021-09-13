FROM node:14-slim

WORKDIR /user/src/app 

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install -g nodemon


COPY . .

EXPOSE 8000

ENTRYPOINT [ "npm" ]
CMD ["start"]
# CMD [ "node", "server.js" ]