# syntax=docker/dockerfile:1

FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS deps
ENV NODE_ENV=development
RUN apk add --no-cache python3 make g++ openssl
COPY package.json package-lock.json ./
COPY prisma ./prisma
ARG DATABASE_URL="postgresql://wms_user:wms_password@postgres:5432/wms_db"
ENV DATABASE_URL=$DATABASE_URL
RUN npm ci
RUN npm run db:generate

FROM deps AS build
ENV NODE_ENV=production
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="postgresql://wms_user:wms_password@postgres:5432/wms_db"
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
RUN npm prune --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
