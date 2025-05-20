# Dockerfile
FROM node:22-alpine

WORKDIR /app
COPY . .
RUN npm ci && npm run build

EXPOSE 8080
CMD ["npm", "run", "start"]

