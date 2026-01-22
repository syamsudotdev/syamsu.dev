FROM node:22-alpine AS base
RUN npm i -g pnpm
WORKDIR /app
COPY . /app

FROM base AS development-dependencies-env
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm i --frozen-lockfile

FROM base AS production-dependencies-env
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm i --prod --frozen-lockfile

FROM base AS build-env
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
COPY . /app/
WORKDIR /app
RUN pnpm build

FROM base
COPY package.json pnpm-lock.yaml /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/dist /app/dist
WORKDIR /app
EXPOSE 3000
CMD ["pnpm", "exec", "vite", "preview", "--port", "3000", "--host"]
