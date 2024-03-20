FROM amd64/node:18.13.0-alpine

RUN apk add --no-cache git

COPY ./ /weavedb

WORKDIR /weavedb

RUN yarn

EXPOSE 9090

CMD ["yarn", "pm2", "start", "index.js", "--no-daemon"]
