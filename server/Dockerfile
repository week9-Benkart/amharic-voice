FROM node:14-slim

WORKDIR /user/src/app 

COPY ./package.json ./

RUN npm install 

COPY . .

EXPOSE 8000

ENTRYPOINT [ "npm" ]

CMD ["start"]