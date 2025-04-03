FROM amd64/node:20-alpine

RUN apk add --no-cache git

COPY ./ /weavedb

WORKDIR /weavedb

RUN npm install

EXPOSE 9090

CMD ["yarn", "pm2", "start", "index.js", "--no-daemon"]
