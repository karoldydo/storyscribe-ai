FROM node:22.16-alpine

WORKDIR /usr/workspace/storyscribe-ai/dist/server

COPY --from=dist . .

CMD ["node", "index.js"]
