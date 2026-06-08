FROM oven/bun:1 AS base
WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS release
WORKDIR /usr/src/app


ENV NODE_ENV=production

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 10000

CMD ["bun", "run", "src/index.ts"]