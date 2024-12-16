# ---------------------------------------
# builder stage
# ---------------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY package.json package-lock.json* ./
RUN npm install

# 全ソースをコピー
COPY . .

# ビルド実行
RUN npm run build

# ---------------------------------------
# runner stage
# ---------------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# 本番に必要なファイルのみコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# ポート設定
EXPOSE 8080

# 環境変数を明示
ENV PORT 8080
ENV NODE_ENV production

CMD ["npm", "run", "start"]
