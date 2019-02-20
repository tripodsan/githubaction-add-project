FROM node:10-slim

WORKDIR /
COPY . /
RUN npm install

ENTRYPOINT [ "node", "/index.js" ]
