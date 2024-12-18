# Node.jsのイメージを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# firebase-toolsをインストール
USER root
RUN npm install -g firebase-tools

# ユーザーをnodeに変更
USER node