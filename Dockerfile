FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

#RUN bun run build

FROM oven/bun:1-distroless as release
WORKDIR /usr/src/app

COPY --from=base /usr/src/app /usr/src/app

EXPOSE 3001

CMD ["bun", "run", "src/index.ts"]