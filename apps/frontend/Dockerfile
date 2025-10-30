# syntax=docker/dockerfile:1

FROM node:18-alpine AS base
WORKDIR /app

FROM base AS deps
ENV NODE_ENV=development
RUN apk add --no-cache libc6-compat
COPY package.json ./
RUN npm install

FROM deps AS build
ENV NODE_ENV=production
COPY . .
RUN mkdir -p public
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN npm prune --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]
