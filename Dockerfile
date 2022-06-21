FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY /build .
ENV NODE_ENV=production
EXPOSE 8088
CMD [ "node", "server.js" ]