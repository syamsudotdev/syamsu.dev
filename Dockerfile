FROM node:22-alpine AS base
RUN npm i -g pnpm@11
WORKDIR /app
COPY . /app

FROM base AS development-dependencies-env
COPY ./package.json pnpm-lock.yaml pnpm-workspace.yaml /app/
WORKDIR /app
RUN pnpm i --frozen-lockfile

FROM base AS build-env
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
COPY . /app/
WORKDIR /app
RUN pnpm rss-gen && pnpm build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build-env /app/dist/client /usr/share/caddy
EXPOSE 3000
