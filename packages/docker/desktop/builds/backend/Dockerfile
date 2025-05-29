FROM node:22.16-alpine

WORKDIR /usr/workspace/storyscribe-ai/dist/server

ENV NODE_ENV=production

ENV POSTGRES_DB=storyscribe-ai
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_USER=root

ENV OLLAMA_SERVICE_API_URL=http://ollama-service:11434
ENV WHISPER_SERVICE_API_URL=http://whisper-service:3000
ENV PDF_SERVICE_API_URL=http://pdf-service:8000

ENV DATABASE_SERVICE_HOST=database-service
ENV REDIS_SERVICE_HOST=redis-service

COPY --from=dist . .

RUN npm install -g wait-on

CMD ["sh", "-c", "wait-on --interval 5000 --timeout 120000 tcp:$DATABASE_SERVICE_HOST:5432 && node index.js"]
