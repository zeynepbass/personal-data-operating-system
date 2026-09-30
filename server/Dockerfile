FROM node:22-alpine
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY src ./src
RUN mkdir -p uploads/profiles && chown -R node:node uploads
USER node
EXPOSE 6021
CMD ["node", "src/index.js"]
