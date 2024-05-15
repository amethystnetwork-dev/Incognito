FROM node:20-alpine AS base

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "./"]
COPY ./static ./static
COPY ./src/ ./src

RUN corepack enable

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

EXPOSE 8080

CMD ["pnpm", "start"]