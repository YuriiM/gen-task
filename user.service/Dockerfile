FROM node:18.15.0-alpine AS app
WORKDIR /opt/node_app
COPY . .
RUN npm install && npm run build
