FROM node:24-bookworm-slim AS build

WORKDIR /opt/app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_URL
ENV NODE_ENV=production PUBLIC_URL=${PUBLIC_URL}
RUN npm run build && npm prune --omit=dev

FROM node:24-bookworm-slim
WORKDIR /opt/app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=1337
COPY --chown=node:node --from=build /opt/app ./
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
