FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
RUN npm run build

FROM nginx:alpine
ARG NEXT_PUBLIC_BASE_PATH=""
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
RUN sed "s|BASE_PATH|${NEXT_PUBLIC_BASE_PATH}|g" /etc/nginx/conf.d/default.conf.template \
    > /etc/nginx/conf.d/default.conf \
    && rm /etc/nginx/conf.d/default.conf.template
EXPOSE 80
