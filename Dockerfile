# FROM google/dart as builder

# RUN apt-get update
# RUN apt-get upgrade -y
# RUN apt-get install unzip

# RUN git clone https://github.com/flutter/flutter.git -b stable
# ENV PATH="$PATH:$PWD/flutter/bin"
# RUN echo $PATH
# RUN echo $PWD
# RUN flutter config --enable-web
# RUN flutter upgrade
# RUN flutter doctor

# RUN git clone https://github.com/pamrulla/gagsterweb.git

# WORKDIR /gagsterweb/app

# RUN flutter pub get
# RUN flutter build web --web-renderer canvaskit --release -v
# WORKDIR /gagsterweb/dist
# WORKDIR /gagsterweb
# # RUN ls -R
# RUN cp -R /gagsterweb/app/build/web/ /gagsterweb/dist/

# # RUN rm -rf ./app
# # RUN rm -rf ./../flutter


# FROM alpine
# COPY --from=builder /gagsterweb/dist/ /
# RUN apk update
# RUN apk add --update python3
# EXPOSE 8080
# WORKDIR /web
# # RUN python3 -m http.server 8080
# ENTRYPOINT ["python3", "-m", "http.server", "8080"]


# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
