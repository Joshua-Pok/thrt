# Install dependencies only when needed
FROM  node:18.18.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install
# Rebuild the source code only when needed
FROM  node:18.18.0-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY ./shared-styles-temp /shared-styles
RUN  npm run pre-commit && npm run clean && npm run build
# Production image, copy all the files and run next
FROM node:18.18.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 && apk add --no-cache --upgrade bash
# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
# Execute script
# ENTRYPOINT ["npm"]
USER nextjs
EXPOSE 3000
ENV PORT 3000
# ENV NEXT_TELEMETRY_DISABLED 1
ENTRYPOINT ["node", "server.js"]
