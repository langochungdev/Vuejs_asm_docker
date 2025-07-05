# ---------------- BUILD ----------------
FROM node:22 AS build   

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# ---------------- SERVE ----------------
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
